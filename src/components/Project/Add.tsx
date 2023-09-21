import { Button } from "antd";
import { Form, Input } from "antd";
import { Modal } from "antd";
import { useState, useEffect } from "react";
import { chooseFolder } from "@/utils";
import { PlusOutlined } from "@ant-design/icons";
export function addProject() {}
type FieldType = {
  name?: string;
  path?: string;
};
// type PropsType = {
//   ok: (p: { value: Record<string, any>; close: () => void }) => void;
// };
type PropsType = {
  ok: (value: Record<string, any>, close: () => void) => void;
};
export const AddProject = (props: PropsType) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [path, setPath] = useState("");
  const [formInstance] = Form.useForm();
  const showModal = () => {
    setIsModalOpen(true);
  };
  function _close() {
    setIsModalOpen(false);
  }
  const handleOk = () => {
    formInstance.submit();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  function choose() {
    setTimeout(() => {
      chooseFolder().then(res => {
        if (res) {
          setPath(res[0]);
        }
      });
    }, 0);
  }
  const onFinish = v => {
    props.ok(v, _close);
  };
  useEffect(() => {
    formInstance.setFields([{ name: "path", value: path }]);
    return () => {};
  }, [path]);
  useEffect(() => {
    formInstance.resetFields();
    setPath("");
    return () => {};
  }, [isModalOpen]);
  return (
    <>
      <Button icon={<PlusOutlined />} type="link" onClick={showModal}></Button>
      <Modal
        title="新增项目"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
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
            rules={[{ required: true, message: "请输入项目名称！" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
