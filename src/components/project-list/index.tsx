import { project_data } from "@/store/slice/project";
import Styles from "./index.module.less";
import { useAppSelector } from "@/store";
export default function ProjectList() {
  const pd = useAppSelector(project_data);
  console.log("pd", pd);
  return (
    <div className={Styles["container"]}>
      {pd.map((v, i) => {
        return (
          <div className={Styles["project-item"]} key={i}>
            {v.name}
            <div className={Styles["project-item-menu"]}>
              {v.scripts.map((it, ii) => {
                return <div  className={Styles["project-item-menu-item"]} key={ii}>{it.name}</div>;
              })}
            </div>

          </div>
        );
      })}
      <div className={Styles["project-add"]}>+</div>
    </div>
  );
}
