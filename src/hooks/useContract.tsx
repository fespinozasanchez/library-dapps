import BookRentalLibrary from '../../build/contracts/BookRentalLibrary.json'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const truffleContract = require('@truffle/contract')

export const useContract = async () => {
  const bookRentalContract = truffleContract(BookRentalLibrary)
  bookRentalContract.setProvider(window.ethereum)

  try {
    const deployedContract = await bookRentalContract.deployed()
    return deployedContract
  } catch (error) {
    console.error('Error loading the contract:', error)
    return null
  }
}
