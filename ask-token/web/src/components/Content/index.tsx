import React, { useEffect } from 'react'
import Web3 from 'web3'
import Order from '../Order'
import Balance from '../Balance'
import { useDispatch } from 'react-redux'
import tokenJson from '../../sol/AskToken.json'
import exchangeJson from '../../sol/Exchange.json'
import { loadBalanceData } from '../../redux/slices/balanceSlice'
import {
  loadCancleOrderData,
  loadFillOrderData,
  loadAllOrderData
} from '../../redux/slices/orderSlice'

export default function Content () {
  const dispatch = useDispatch()
  useEffect(() => {
    start()
  }, [])

  const start = async () => {
    const web = (await initWeb()) as any
    ;(window as any).web = web
    // 初始化余额信息
    // @ts-ignore
    dispatch<any>(loadBalanceData(web))

    // 初始化订单信息
    // @ts-ignore
    dispatch<any>(loadCancleOrderData(web))
    // @ts-ignore
    dispatch<any>(loadFillOrderData(web))
    // @ts-ignore
    dispatch<any>(loadAllOrderData(web))

    // 事件订阅
    web.exchange.events.OrderEvent({}, () => {
      // @ts-ignore
      dispatch<any>(loadAllOrderData(web))
    })
    web.exchange.events.CancleOrderEvent({}, () => {
      // @ts-ignore
      dispatch<any>(loadCancleOrderData(web))
    })
    web.exchange.events.FillOrderEvent({}, () => {
      // @ts-ignore
      dispatch<any>(loadFillOrderData(web))
      // @ts-ignore
      dispatch<any>(loadBalanceData(web))
    })
  }
  const initWeb = async () => {
    const web3 = new Web3(
      (window as any).web3.currentProvider || 'http://localhost:8545'
    )

    // 网站账号登录使用
    const accounts = await web3.eth.requestAccounts()
    console.log('accounts', accounts[0])

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
