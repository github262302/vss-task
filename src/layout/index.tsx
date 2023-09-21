import styles from "./index.module.less";
import Menu from "./Menu.tsx";
import StatusBar from "./StatusBar.tsx";
import Main from "./Main.tsx";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/index";
import { get_process_data, process_data } from "../store/slice/process";
import { AddProject } from "../components/Project/Add";
import { useProjectStorage } from "@/utils/project";
import { get_project_data_async, add_project } from "../store/slice/project";
import { CloseOutlined, MinusOutlined } from "@ant-design/icons";
import { Space } from "antd";
const ups = new useProjectStorage();
export default () => {
  console.log("layout render");
  const dispatch = useAppDispatch();
  function add(v, close) {
    dispatch(add_project(v));
    dispatch(get_project_data_async());
    close();
  }
  return (
    <div className={styles["container"]}>
      <div className={styles["header"]}>
        <div className={styles["title"]}>
          <img className={styles["styleslogo"]} style={{ width: "18px" }} />
          <div className={styles["title-content"]}>VSS-Task 管理器</div>
        </div>
        <div className={styles["right"]}>
          <Space>
            <MinusOutlined />
            <CloseOutlined />
          </Space>
        </div>
      </div>
      <div className={styles["menu"]}>
        <Menu />
        <div>
          <AddProject ok={add} />
        </div>
      </div>
      <div className={styles["main"]}>
        <Main></Main>
      </div>
      <StatusBar />
    </div>
  );
};
