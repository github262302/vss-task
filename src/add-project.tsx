import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { Button, Form } from "antd";
import { Input } from "antd";
import { chooseFolder, closeAddProject, reloadMainWindow } from "./utils";
import { ups } from "./utils/project";
const container = document.getElementById("app");
const root = createRoot(container);
type FieldType = {
  name?: string;
  path?: string;
};
function Root() {
  const [formInstance] = Form.useForm();
  const onFinish = v => {
    // 新增项目
    console.log("add project success",JSON.stringify(v));
    ups.add(v);
    // 新增后关闭弹窗
    console.log("close");
    closeAddProject();
    // 刷新main页面
    console.log("reload");
    reloadMainWindow();
  };
  function choose() {
    setTimeout(() => {
      chooseFolder().then(res => {
        if (res) {
          // setPath(res[0]);
          formInstance.setFieldValue("path", res[0]);
        }
      });
    }, 0);
  }
  return (
    <div>
      <Form
        form={formInstance}
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="项目路径"
          name="path"
          rules={[{ required: true, message: "请选择项目路径!" }]}
        >
          <Input readOnly addonAfter={<span onClick={choose}>选择</span>} />
        </Form.Item>
        <Form.Item<FieldType>
          label="名称"
          name="name"
          rules={[{ required: true, message: "请输入项目名称！" },{
            pattern: /^[a-zA-Z0-9_-]+$/,
            message: "项目名称只能包含字母、数字、下划线和中划线"
          }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>>
          <Button htmlType="submit" type="primary">
            确定
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
root.render(<Root />);
