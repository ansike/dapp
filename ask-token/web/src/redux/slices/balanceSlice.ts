import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// 为 slice state 定义一个类型
interface BalanceSliceState {
  TokenWallet: string
  TokenExchange: string
  EtherWallet: string
  EtherExchange: string
}

// 使用该类型定义初始 state
const initialState: BalanceSliceState = {
  TokenWallet: '0',
  TokenExchange: '0',
  EtherWallet: '0',
  EtherExchange: '0'
}

export const balanceSlice = createSlice({
  name: 'balance',
  // `createSlice` 将从 `initialState` 参数推断 state 类型
  initialState,
  reducers: {
    setTokenWallet (state, action) {
      state.TokenWallet = action.payload
    },
    setTokenExchange (state, action) {
      state.TokenExchange = action.payload
    },
    setEtherWallet (state, action) {
      state.EtherWallet = action.payload
    },
    setEtherExchange (state, action) {
      state.EtherExchange = action.payload
    }
  }
})

export const {
  setTokenWallet,
  setTokenExchange,
  setEtherWallet,
  setEtherExchange
} = balanceSlice.actions

export default balanceSlice.reducer
