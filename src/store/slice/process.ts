import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export type ProcessField = {
  name: string;
  pid: number;
  status: "runing" | "close";
  log: string[];
};
export type ProcessFieldUsed = Omit<ProcessField, "log"> & {
  label: string;
  key: string;
  children: string;
};
export const processSlice = createSlice({
  name: "process",
  initialState: {
    process: [] as ProcessField[],
  },
  // ? 操作数据
  reducers: {
    update_process: (state, action) => {
      console.log("update_process", action.payload);
      state.process = action.payload;
    }
  },
  // ? 监听状态的改变 如成功设置数据 和 loading
  extraReducers: {},
});
export const get_process_data = createAsyncThunk<any>(
  "get/process_data",
  async (action, state) => {
    console.log("first", state);
    return state;
  },
);
export const process_data = state => {
  return state.process.process as Array<ProcessField>;
};
export const { update_process } = processSlice.actions;
export default processSlice.reducer;
