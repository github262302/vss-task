import styles from "./index.module.less";
import Menu from "./Menu.tsx";
import StatusBar from "./StatusBar.tsx";
import Main from "./Main.tsx";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/index";
import { get_process_data, process_data } from "../store/slice/process";
export default () => {
  return (
    <div className={styles["container"]}>
      <div className={styles["header"]}>
        <div className={styles["title"]}>
          <img className={styles["styleslogo"]} style={{ width: "18px" }} />
          <div className={styles["title-content"]}>VSS-Task 管理器</div>
        </div>
        <div className={styles["right"]}>123</div>
      </div>
      <div className={styles["menu"]}>
        <Menu />
      </div>
      <div className={styles["main"]}>
        <Main></Main>
      </div>
      <StatusBar />
    </div>
  );
};
