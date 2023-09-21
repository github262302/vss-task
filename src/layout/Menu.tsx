import { useAppDispatch, useAppSelector } from "@/store";
import { project_data, update_project } from "@/store/slice/project";
import { process_data } from "@/store/slice/process";
import React, { useEffect } from "react";
import { loadProjectTask } from "@/utils/index";
import { useProjectStorage } from "@/utils/project";
import { Collapse } from "antd";
import styles from "./Menu.modules.less";
import { Button } from "antd";
import { startProcess } from "@/utils/process";
import { openFolder, openTerminal, openVscode } from "@/utils/index";
import { message } from "antd";
import { Modal } from "antd";
import { get_project_data_async } from "../store/slice/project";
const ups = new useProjectStorage();

function taskName(data, all) {
  return [all.name, data.label].join("-");
}
function scriptName(data, all) {
  return [all.name, data.name].join("-");
}
const App = () => {
  console.log("menu render");
  const dispatch = useAppDispatch();
  const projectData = useAppSelector(project_data);
  const processData = useAppSelector(process_data);
  function DeleteItem(name) {
    Modal.confirm({
      onOk: () => {
        ups.remove(name);
        dispatch(get_project_data_async());
      },
      title: "系统通知",
      content: "是否移除项目:" + name + " ?",
    });
  }
  const showProjectData = projectData.map((item, index) => ({
    key: index,
    label: item.name,
    children: (
      <div>
        <div className={styles["sub-task"]}>
          <div className={styles["sub-task-menu"]}>
            <Button type={"link"} onClick={openTerminal.bind(null, item.path)}>
              shell
            </Button>
            <Button type={"link"} onClick={openFolder.bind(null, item.path)}>
              folder
            </Button>
            <Button type={"link"} onClick={openVscode.bind(null, item.path)}>
              vscode
            </Button>
            <Button type={"link"} onClick={() => DeleteItem(item.name)}>
              shanchu
            </Button>
          </div>
        </div>
        <div>
          <div>task</div>
          {item.tasks.map((item, index) => (
            <div key={index}>{item.label} 🚀</div>
          ))}
        </div>
        <div>
          <div>scripts</div>
          {item.scripts.map((_item, index) => (
            <div key={index}>
              {_item.name}
              <span onClick={runScript.bind(null, _item, item)}>🚀</span>
            </div>
          ))}
        </div>
      </div>
    ),
  }));
  function runTask(data, all) {
    let name = taskName(data, all);
    if (processData.some(e => e.name == name)) {
      //   proxy.$message({ type: "error", message: "已启动" });
      return;
    }
    let temp = {
      type: data.type,
      command: data.command,
      name: name,
      cwd: all.path,
    };
    startProcess(temp);
  }
  function runScript(data, all) {
    let name = scriptName(data, all);
    if (processData.some(e => e.name == name)) {
      message.error("已启动!");
      return;
    }
    let temp = {
      type: "npm",
      command: data.command,
      name: name,
      cwd: all.path,
    };
    startProcess(temp);
  }

  return (
    <div className={styles["demo-collapse"]}>
      <Collapse items={showProjectData} defaultActiveKey={["1"]} />
    </div>
  );
};
export default App;
