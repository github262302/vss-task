import Layout from "@/layout/index";
import { useAppDispatch } from "@/store";
import { update_process } from "@/store/slice/process";
import { useEffect } from "react";
import { onProcess } from "@/utils/process";
import { update_project } from "@/store/slice/project";
import { loadProjectTask } from "@/utils";
import { useProjectStorage } from "@/utils/project";
import { onMessage } from "@/utils/index";
import { add_message } from "@/store/slice/message";
import { message } from "antd";
const ups = new useProjectStorage();
export default () => {
  const dispatch = useAppDispatch();

  // ? 订阅流程数据
  useEffect(() => {
    const pushData = data => {
      dispatch(update_process(data));
    };
    onProcess(pushData);
    return () => {};
  }, []);

  // ? 订阅菜单数据
  useEffect(() => {
    loadProjectTask(ups.load()).then(res => {
      dispatch(update_project(res));
    });
    return () => {};
  }, []);

  // ? 订阅消息数据
  useEffect(() => {
    onMessage(data => {
      message.info(data.content);
      dispatch(add_message(data));
    });
    return () => {};
  }, []);
  return <Layout></Layout>;
};