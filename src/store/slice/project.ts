import { createSlice } from "@reduxjs/toolkit";
import { loadProjectTask } from "@/utils";
import { ups } from "@/utils/project";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../index";

type project = {
  name: string;
  path: string;
};
type actionPayload = {
  type: string;
  payload: project[];
};
export const projectSlice = createSlice({
  name: "project",
  initialState: {
    project: [] as project[],
    initProject: [] as project[],
  },
  // ? 操作数据
  reducers: {
    update_project: (state, action: actionPayload) => {
      state.project = action.payload;
    },
    add_project: (state, action:actionPayload) => {
      ups.add(action.payload);
    },
  },
  // ? 监听状态的改变 如成功设置数据 和 loading
  extraReducers: builder => {
    builder.addCase(get_project_data_async.fulfilled, (state, action) => {
      state.project = action.payload;
    });
  },
});
export const get_project_data_async = createAsyncThunk(
  "get/project_data",
  async (action, state) => {
    return await loadProjectTask(ups.load());
  },
);
export const project_data = (state: RootState) => {
  return state.project.project;
};
export const { update_project, add_project } = projectSlice.actions;
export default projectSlice.reducer;
