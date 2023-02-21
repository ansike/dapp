import React, { useEffect } from 'react'
import Web3 from 'web3'
import Order from '../Order'
import Balance from '../Balance'
import { useDispatch } from 'react-redux'
import tokenJson from '../../sol/AskToken.json'
import exchangeJson from '../../sol/Exchange.json'
import { loadBalanceData } from '../../redux/slices/balanceSlice'

export default function Content () {
  const dispatch = useDispatch()
  useEffect(() => {
    start()
  }, [])

  const start = async () => {
    const web = await initWeb() as any
    (window as any).web = web
    // @ts-ignore
    dispatch<any>(loadBalanceData(web))
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
    <div>
      <Balance />
      <Order />
    </div>
  )
}
