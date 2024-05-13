const BookRentalLibrary = artifacts.require("BookRentalLibrary");

contract("BookRentalLibrary", accounts => {
    let instance;

    beforeEach(async () => {
        instance = await BookRentalLibrary.new();
    });

    it('should have the correct name', async () => {
        let _name = await instance.name();
        assert.equal(_name, "BookRentalToken", "The name of the token should be 'BookRentalToken'");
    });

    it('should have the correct symbol', async () => {
        let _symbol = await instance.symbol();
        assert.equal(_symbol, "BRT", "The symbol of the token should be 'BRT'");
    });

    it('should mint a book and return correct token details', async () => {
        let isbn = 9780132350884;
        let price = 500; // Wei
        let startTime = 1622548800; // Example start time (UNIX timestamp)
        let endTime = 1625130800; // Example end time (UNIX timestamp)
        let toAddress = accounts[1]; // Address to which the token will be minted
    
        let receipt = await instance.safeMintBook(toAddress, isbn, price, endTime, startTime);
        let tokenId = receipt.logs[0].args.tokenId;  // Asume que el evento Transfer es el primer log
    
        // Validate token data using view functions
        let storedIsbn = await instance.getISBN(tokenId);
        let storedPrice = await instance.getRentalPrice(tokenId);
        let storedEndTime = await instance.getRentalEnd(tokenId);
        let storedStartTime = await instance.getRentalStart(tokenId);
    
        assert.equal(storedIsbn, isbn, "The ISBN should match the input");
        assert.equal(storedPrice, price, "The rental price should match the input");
        assert.equal(storedEndTime, endTime, "The end time should match the input");
        assert.equal(storedStartTime, startTime, "The start time should match the input");
    });
    

});
