import React, { useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import Web3 from 'web3'
import tokenJson from './sol/AskToken.json'
import exchangeJson from './sol/Exchange.json'

function App () {
  useEffect(() => {
    start()
  }, [])

  const start = async () => {
    const web = await initWeb()
    console.log(web)
  }
  const initWeb = async () => {
    const web3 = new Web3(
      (Web3 as any).currentProvider || 'http://localhost:8545'
    )

    const accounts = await web3.eth.getAccounts()
    const networkId = await web3.eth.net.getId()
    const token = new web3.eth.Contract(
      tokenJson.abi as any,
      tokenJson.networks[
        (networkId + '') as keyof typeof tokenJson.networks
      ].address
    )

    const exchange = new web3.eth.Contract(
      exchangeJson.abi as any,
      exchangeJson.networks[
        (networkId + '') as keyof typeof exchangeJson.networks
      ].address
    )
    return {
      web3,
      account: accounts[0],
      token,
      exchange
    }
  }
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
