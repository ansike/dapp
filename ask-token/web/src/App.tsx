import React, { useEffect } from 'react'
import Web3 from 'web3'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import logo from './logo.svg'
import tokenJson from './sol/AskToken.json'
import exchangeJson from './sol/Exchange.json'
import Content from './components/Content'
import './App.css'

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
    <Provider store={store}>
      <Content />
    </Provider>
  )
}

export default App
