import styles from "./index.module.less";
import Menu from "./Menu.tsx";
import StatusBar from "./StatusBar.tsx";
import Main from "./Main.tsx";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/index";
import { get_process_data, process_data } from "../store/slice/process";
import { AddProject } from "../components/Project/Add";
import { useProjectStorage } from "@/utils/project";
import { get_project_data_async, add_project, project_data } from "../store/slice/project";
import { CloseOutlined, MinusOutlined } from "@ant-design/icons";
import { Space } from "antd";
import ProjectList from "@/components/project-list/index.tsx";
import { winClose, winMinimize } from "@/utils/index.js";
const ups = new useProjectStorage();
export default () => {
  console.log("layout render");
  const dispatch = useAppDispatch();
  const pd = useAppSelector(project_data)
  function add(v, close) {
    dispatch(add_project(v));
    dispatch(get_project_data_async());
    close();
  }

  
  return (
    <div className={styles["container"]}>
      <div className={styles["main"]}>
        <ProjectList />
      </div>
      <div className={styles["footer"]}>
        <StatusBar />
      </div>
    </div>
  );
};
