// import BookRentalLibrary from '../../build/contracts/BookRentalLibrary.json'
import Web3 from 'web3'
// const contract = require('@truffle/contract')

export const init = async () => {
  await loadWeb3()
  await loadAccount()
}

const loadAccount = async () => {
  const accounts = await window.web3.eth.getAccounts()
  return accounts[0]
}

const loadWeb3 = async () => {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (window.ethereum) {
    try {
      const web3 = new Web3(window.ethereum)
      await window.ethereum.request({ method: 'eth_requestAccounts' })
      // Get the connected accounts
      const accounts = await web3.eth.getAccounts()
    } catch (error) {
      console.log(error)
    }
  } else {
    console.log(
      'Non-Ethereum browser detected. You should consider trying MetaMask!'
    )
  }
}
