import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
const ETH_ADDRESS = '0x0000000000000000000000000000000000000000'

// 为 slice state 定义一个类型
interface OrderSliceState {
  CancleOrders: any[]
  FillOrders: any[]
  AllOrders: any[]
}

// 使用该类型定义初始 state
const initialState: OrderSliceState = {
  CancleOrders: [],
  FillOrders: [],
  AllOrders: []
}

export const OrderSlice = createSlice({
  name: 'order',
  // `createSlice` 将从 `initialState` 参数推断 state 类型
  initialState,
  reducers: {
    setCancleOrders (state, action) {
      state.CancleOrders = action.payload
    },
    setFillOrders (state, action) {
      state.FillOrders = action.payload
    },
    setAllOrders (state, action) {
      state.AllOrders = action.payload
    }
  }
})

export const { setCancleOrders, setFillOrders, setAllOrders } =
  OrderSlice.actions

export default OrderSlice.reducer

export const loadCancleOrderData = createAsyncThunk(
  'order/fetchCancleOrderData',
  async (data, { dispatch }) => {
    const { exchange } = data as any
    // 取消订单
    // console.log(await exchange.methods.orders(1).call())
    const result = await exchange.getPastEvents('CancleOrderEvent', {
      fromBlock: 0,
      toBlock: 'latest'
    })
    const cancleOrders = result.map((r: any) => r.returnValues)
    dispatch(setCancleOrders(cancleOrders))
  }
)

export const loadFillOrderData = createAsyncThunk(
  'order/fetchFillOrderData',
  async (data, { dispatch }) => {
    const { exchange } = data as any
    const result = await exchange.getPastEvents('FillOrderEvent', {
      fromBlock: 0,
      toBlock: 'latest'
    })
    const fillOrders = result.map((r: any) => r.returnValues)
    dispatch(setFillOrders(fillOrders))
  }
)

export const loadAllOrderData = createAsyncThunk(
  'order/fetchAllOrderData',
  async (data, { dispatch }) => {
    const { exchange } = data as any
    const result = await exchange.getPastEvents('OrderEvent', {
      fromBlock: 0,
      toBlock: 'latest'
    })
    const allOrders = result.map((r: any) => r.returnValues)
    dispatch(setAllOrders(allOrders))
  }
)
