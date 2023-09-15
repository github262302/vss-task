import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import processReducer from "./slice/process";
import messageReducer from "./slice/message";
import projectReducer from "./slice/project";
import settingsReducer from "./slice/settings";
// import userReducer from './slice/user'
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// 类型定义
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const store = configureStore({
  reducer: {
    process: processReducer,
    settings: settingsReducer,
    message: messageReducer,
    project: projectReducer,
  },
});

// 只是加上了类型定义
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
