import BookRentalLibrary from '../../build/contracts/BookRentalLibrary.json'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const contract = require('@truffle/contract')

export async function useContract () {
  const bookRentalContract = contract(BookRentalLibrary)
  bookRentalContract.setProvider(window.ethereum)
  const deployedContract = await bookRentalContract.deployed()
  return deployedContract
}
