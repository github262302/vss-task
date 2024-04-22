import styles from "./index.module.less";
import StatusBar from "./StatusBar.tsx";
import ProjectList from "@/components/project-list/index.tsx";
export default () => {
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
