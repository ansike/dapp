import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

export default function Balance () {
  const balance = useSelector((state: RootState) => state.balance)
  console.log(balance)

  return <div>Balance-{balance.EtherExchange}</div>
}
