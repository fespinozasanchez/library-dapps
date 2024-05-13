/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useState, useEffect } from 'react'
import Web3 from 'web3'

declare global {
  interface Window {
    ethereum?: any
  }
}

export function useMetamask () {
  const [connectedAccount, setConnectedAccount] = useState<string | null>(null)
  const [web3, setWeb3] = useState<Web3 | null>(null)

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const web3Instance = new Web3(window.ethereum)
      setWeb3(web3Instance)

      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        setConnectedAccount(accounts.length > 0 ? accounts[0] : null)
      })

      window.ethereum.on('chainChanged', () => {
        window.location.reload()
      })
    }
  }, [])

  const connectMetamask = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('Please install MetaMask!')
      return
    }

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' })
      const accounts = await web3?.eth.getAccounts()
      setConnectedAccount(
        accounts !== null && accounts !== undefined ? accounts[0] : null
      )
    } catch (error) {
      console.error('Failed to connect MetaMask', error)
      alert('Failed to connect MetaMask')
    }
  }

  return { connectedAccount, connectMetamask }
}
