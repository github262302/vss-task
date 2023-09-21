import styles from "./status.module.less";
import Github from "@/assets/icons/github.svg";
import { BugOutlined, PictureOutlined, StarOutlined } from "@ant-design/icons";
export default () => {
  return (
    <div className={styles["tool"]}>
      <div className={styles["items"]}>statusBar</div>
      <div className={styles["items"]}>
        <img src={Github} />
      </div>
      <div className={styles["items"]}>
        <BugOutlined />
      </div>
      <div className={styles["items"]}>
        <PictureOutlined />
      </div>
      <div className={styles["items"]}>
        <StarOutlined />
      </div>
    </div>
  );
};
