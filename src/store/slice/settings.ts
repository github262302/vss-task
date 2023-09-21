import { createSlice } from '@reduxjs/toolkit'
import { clone } from 'ramda';
import { loadSettings } from '@/utils/settings';
import {RootState} from '../index'
export const settingsSlice = createSlice({
  name:"settings",
  initialState:{
    settings:clone(loadSettings()),
    animationData:[],
    bgData:[]
  },
  // ? 操作数据
  reducers:{
    update_settings:(state, action)=>{
      state.settings=action.payload
    }
  },
  // ? 监听状态的改变 如成功设置数据 和 loading
  extraReducers:{
  },
})
export const settings_data = (state:RootState)=> {
	return state.settings.settings
}
export const {update_settings} = settingsSlice.actions
export default settingsSlice.reducer
