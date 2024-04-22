import { get_project_data_async, project_data } from "@/store/slice/project";
import Styles from "./index.module.less";
import { useAppDispatch, useAppSelector } from "@/store";
import { openAddProject, openTerminal, startProcessOutSide } from "@/utils";
import { openFolder } from "@/utils/index";
import { settings_data } from "@/store/slice/settings";
import { ups } from "@/utils/project";
export default function ProjectList() {
  const dispatch = useAppDispatch();
  const pd = useAppSelector(project_data);
  const settings = useAppSelector(settings_data);
  const renderData = pd.slice(0);
  renderData.sort((a, b) => {
    return a.scripts.length - b.scripts.length;
  });
  const addProject = () => {
    openAddProject();
  };
  const terminal = path => {
    openTerminal(path);
  };
  const deleteProject = (name: string) => {
    console.log("delete", name);
    const isRemove = confirm("是否删除项目 " + name + " ?");
    if (isRemove) {
      ups.remove(name);
      dispatch(get_project_data_async());
    }
  };
  const folder = path => {
    openFolder(path);
  };
  const startProcess = (index, data) => {
    let node = renderData[index];
    const params: startProcessOutSideParams = {
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
      {renderData.map((v, i) => {
        return (
          <>
            <div className={Styles["project-item-title-container"]}>
              <div className={Styles["project-item-title"]}>{v.name}</div>
            </div>
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
                <i
                  onClick={() => deleteProject(v.name)}
                  className="btn icon iconfont icon-shanchu"
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
          </>
        );
      })}
      <div onClick={addProject} className={Styles["project-add"]}>
        +
      </div>
    </div>
  );
}
