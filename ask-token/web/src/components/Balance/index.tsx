import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

export default function Balance () {
  const balance = useSelector((state: RootState) => state.balance)
  function convert (money: string) {
    if (!(window as any).web) return '0'
    console.log((window as any).web.web3
);
    
    return (window as any).web.web3.utils.fromWei(money, 'ether')
  }
  return (
    <div>
      <div>钱包中以太币：{convert(balance.EtherWallet)}</div>
      <div>钱包中ASK：{convert(balance.TokenWallet)}</div>
      <div>交易所中以太币：{convert(balance.EtherExchange)}</div>
      <div>交易所中ASK：{convert(balance.TokenExchange)}</div>
    </div>
  )
}
