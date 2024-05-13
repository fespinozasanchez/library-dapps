const BookRentalLibrary = artifacts.require('BookRentalLibrary')

contract('BookRentalLibrary', accounts => {
  let instance

  beforeEach(async () => {
    instance = await BookRentalLibrary.new()
  })

  it('should have the correct name', async () => {
    const _name = await instance.name()
    assert.equal(_name, 'BookRentalToken', "The name of the token should be 'BookRentalToken'")
  })

  it('should have the correct symbol', async () => {
    const _symbol = await instance.symbol()
    assert.equal(_symbol, 'BRT', "The symbol of the token should be 'BRT'")
  })

  it('should mint a book and return correct token details', async () => {
    const isbn = 9780132350884
    const price = 500 // Wei
    const startTime = 1622548800 // Example start time (UNIX timestamp)
    const endTime = 1625130800 // Example end time (UNIX timestamp)
    const toAddress = accounts[1] // Address to which the token will be minted

    const receipt = await instance.safeMintBook(toAddress, isbn, price, endTime, startTime)
    const tokenId = receipt.logs[0].args.tokenId // Asume que el evento Transfer es el primer log

    // Validate token data using view functions
    const storedIsbn = await instance.getISBN(tokenId)
    const storedPrice = await instance.getRentalPrice(tokenId)
    const storedEndTime = await instance.getRentalEnd(tokenId)
    const storedStartTime = await instance.getRentalStart(tokenId)

    assert.equal(storedIsbn, isbn, 'The ISBN should match the input')
    assert.equal(storedPrice, price, 'The rental price should match the input')
    assert.equal(storedEndTime, endTime, 'The end time should match the input')
    assert.equal(storedStartTime, startTime, 'The start time should match the input')
  })
})
