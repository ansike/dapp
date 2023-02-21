import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
const ETH_ADDRESS = '0x0000000000000000000000000000000000000000'

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

export const loadBalanceData = createAsyncThunk(
  'balance/fetchBalanceData',
  async (data, { dispatch }) => {
    const { web3, token, exchange, account } = data as any
    // 钱包余额
    const TokenWallet = await token.methods.balanceOf(account).call()
    dispatch(setTokenWallet(TokenWallet))

    // 交易所余额
    const TokenExchange = await exchange.methods
      .tokens(token.options.address, account)
      .call()
    dispatch(setTokenExchange(TokenExchange))

    // ETH余额
    const EtherWallet = await web3.eth.getBalance(account)
    dispatch(setEtherWallet(EtherWallet))

    const EtherExchange = await exchange.methods
      .tokens(ETH_ADDRESS, account)
      .call()
    dispatch(setEtherExchange(EtherExchange))

    // ETH在交易所余额
  }
)
