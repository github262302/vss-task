import { createSlice } from '@reduxjs/toolkit'
export const projectSlice = createSlice({
  name:"project",
  initialState:{
    project:[]
  },
  // ? 操作数据
  reducers:{
    update_project:(state, action)=>{
      console.log("state, action", action)
      state.project=action.payload
    }
  },
  // ? 监听状态的改变 如成功设置数据 和 loading
  extraReducers:{
  },
})
export const project_data = (state) => {
	return state.project.project
}
export const {update_project} = projectSlice.actions
export default projectSlice.reducer
