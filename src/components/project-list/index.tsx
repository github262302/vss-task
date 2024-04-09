import { project_data } from "@/store/slice/project";
import Styles from "./index.module.less";
import { useAppSelector } from "@/store";
import { openAddProject, openTerminal, startProcessOutSide } from "@/utils";
import { openFolder } from "@/utils/index";
import { settings_data } from "@/store/slice/settings";
export default function ProjectList() {
  const pd = useAppSelector(project_data);
  const settings = useAppSelector(settings_data);
  console.log("pd", pd);
  const addProject = () => {
    openAddProject();
  };
  const terminal = path => {
    openTerminal(path);
  };
  const folder = path => {
    openFolder(path);
  };
  const startProcess = (index, data) => {
    let node = pd[index];
    const params:startProcessOutSideParams = {
      cwd: node.path,
      projectName: node.name,
      scriptName: data.name,
      command: data.command,
      type: "scripts",
      nodePackageTools: settings.nodePackageTools,
    };
    startProcessOutSide(params);
  };
  return (
    <div className={Styles["container"]}>
      {pd.map((v, i) => {
        return (
          <div className={Styles["project-item"]} key={i}>
            {v.name}
            <div className={Styles["project-item-menu"]}>
              <div
                className={Styles["project-item-menu-item"]}
                style={{ cursor: "default" }}
              >
                <i
                  onClick={() => terminal(v.path)}
                  className="btn icon iconfont icon-shell"
                ></i>
                <i
                  onClick={() => folder(v.path)}
                  className="btn icon iconfont icon-folder"
                ></i>
              </div>
              {v.scripts.map((it, ii) => {
                return (
                  <div
                    onClick={() => startProcess(i, it)}
                    className={Styles["project-item-menu-item"]}
                    key={ii}
                  >
                    {it.name}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <div onClick={addProject} className={Styles["project-add"]}>
        +
      </div>
    </div>
  );
}
