import React, { useRef, useState } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { useEffect } from "react";
import { ProcessFieldUsed, process_data } from "@/store/slice/process";
import { useAppSelector } from "@/store";
import { Terminal } from "xterm";
import { WebLinksAddon } from "xterm-addon-web-links";
import "xterm/css/xterm.css";
import { stopProcess } from "@/utils";
import { message } from "antd";
import { Modal } from "antd";
import { Col, Divider, Row } from "antd";
import { Button } from "antd";
import { Empty } from "antd";
import undraw_task_re from "@/assets/bg/undraw_task_re.svg";
/**
 * @type {Record<string,Terminal>}
 */
const ters = {};
const XTermApp = ({ pid, close }) => {
  const processData = useAppSelector(process_data);
  const ref = useRef();
  const currentData = processData.find(item => item.pid === pid);
  useEffect(() => {
    console.log("mount", ref);
    let terminal = new Terminal();
    terminal.loadAddon(new WebLinksAddon());
    terminal.open(ref.current);
    ters[pid] = terminal;
    return () => {
      delete ters[pid];
    };
  }, []);
  useEffect(() => {
    console.log("update:currentData", currentData);
    if (ters[pid]) {
      new Promise((res, rej) => {
        ters[pid].reset();
        res(1);
      }).then(() => {
        ters[pid].write(currentData.log.join("\n"));
      });
    }
  }, [currentData]);
  return (
    <div>
      <Row>
        <Col flex="auto">
          进程Id:&nbsp;&nbsp;&nbsp;&nbsp;<span>{currentData.pid}</span>
        </Col>
        <Col flex="100px">
          <Button onClick={() => close(currentData.pid)}>停止</Button>
        </Col>
      </Row>
      <div></div>
      <div>
        状态: <span>{currentData.status}</span>
      </div>
      <div>
        任务名称: <span>{currentData.name}</span>
      </div>
      <div>
        执行命令: <span>{currentData.command}</span>
      </div>
      <div ref={ref}></div>
    </div>
  );
};
const App: React.FC = () => {
  const [tabKey, setTabKey] = useState("1");
  const processData = useAppSelector(process_data);
  const onClose = pid => {
    if (processData.some(item => item.pid == pid && item.status == "close")) {
      stopProcess(pid);
      delete ters[pid];
    } else if (processData.some(item => item.pid == pid)) {
      Modal.confirm({
        content: `是否关闭?进程 ${pid} 将被Kill!`,
        title: "系统通知",
        onOk: () => {
          stopProcess(pid);
        },
      });
    }
  };
  const _processData: ProcessFieldUsed[] = processData.map(item => ({
    name: item.name,
    pid: item.pid,
    status: item.status,
    label: item.name,
    key: item.pid + "",
    children: <XTermApp pid={item.pid} close={onClose} />,
  }));
  return (
    <div>
      <Tabs
        defaultActiveKey={tabKey}
        items={_processData}
        onChange={setTabKey}
      />
      {_processData.length === 0 && (
        <Empty description="无任务" image={undraw_task_re}></Empty>
      )}
    </div>
  );
};

export default App;
