import { createSlice } from '@reduxjs/toolkit'
export const messageSlice = createSlice({
  name:"message",
  initialState:{
    message:[]
  },
  // ? 操作数据
  reducers:{
    add_message:(state, action)=>{
      console.log("add_message",action)
      state.message=action.payload
    }
  },
  // ? 监听状态的改变 如成功设置数据 和 loading
  extraReducers:{
  },
})
export const message_data = (state) => {
	return state.message.message
}
export const {add_message} = messageSlice.actions
export default messageSlice.reducer
