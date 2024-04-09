import styles from "./status.module.less";
import { useAppDispatch, useAppSelector } from "@/store";
import { settings_data, update_settings } from "@/store/slice/settings";
export default () => {
  const settings = useAppSelector(settings_data);
  const dispatch = useAppDispatch();
  const value = settings.nodePackageTools;
  const selectChange = (e: any) => {
    dispatch(
      update_settings({ ...settings, nodePackageTools: e.target.value }),
    );
  };

  return (
    <div className={styles["tool"]}>
      <div className={styles["items"]}>
        <select title="script使用的命令工具" onInput={selectChange} value={value}>
          <option>pnpm</option>
          <option>yarn</option>
          <option>npm</option>
          <option>cnpm</option>
        </select>
      </div>
    </div>
  );
};
