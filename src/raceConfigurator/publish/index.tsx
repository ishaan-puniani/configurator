import { CloudUploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Space } from "antd";
import axios from "axios";
import { useState } from "react";
import { getData, RACE_STORAGE_KEY } from "../../storage";
import Loader from "../../utils/Loader";
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 10 },
    sm: { span: 20, offset: 14 },
  },
};

const PublishForm = ({ data, handlePatch }: any) => {
  const [loaderVisibility, setLoaderVisibility] = useState<boolean>(false);

  const uploadToServer = async () => {
    setLoaderVisibility(true);
    const configuration = getData(RACE_STORAGE_KEY);
    var data = JSON.stringify({
      gameid: "race-server-base",
      ...configuration,
      configurator: "v0.0.1",
    });
    var config = {
      method: "post",
      url: "https://ml-search-mhwiw.ondigitalocean.app/api/student/set-config",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    //@ts-ignore
    const update = await axios(config);
    console.log(update);
  };
  const cloneConfiguration = () => {
    const formValue = form.getFieldsValue();
    handlePatch({ ...formValue, configid: undefined });
    uploadToServer();
  };
  const onSavedSuccessfully = () => {
    Modal.info({
      title: "Configuration uploader to server",
      content: <div></div>,
      onOk() {},
    });
  };
  const onFinish = (values: any) => {
    console.log("Success:", values);
    handlePatch(values);
    uploadToServer();
  };
  const [form] = Form.useForm();
  return (
    <div>
      {!loaderVisibility ? (
        <>
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={data}
            onFinish={onFinish}
            //  onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="name"
              name="name"
              rules={[{ required: true, message: "Please input name!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="description"
              name="description"
              rules={[{ required: true, message: "Please input remarks!" }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="remark"
              name="remark"
              rules={[{ required: true, message: "Please input remarks!" }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              name={"gameLink"}
              label="gameLink"
              rules={[{ required: true, message: "Please input gameLink!" }]}
            >
              <Select>
                <Select.Option value="http://localhost:4200">
                  LocalHost:4200
                </Select.Option>
                <Select.Option value="https://horsebet-gameolive.web.app">
                  Static Server: horsebet
                </Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name={"status"}
              label="status"
              rules={[{ required: true, message: "Please input status!" }]}
            >
              <Select>
                <Select.Option value="development">
                  In Development
                </Select.Option>
                <Select.Option value="inactive">Inactive</Select.Option>
                <Select.Option value="bugbash">Bug Bash</Select.Option>
                <Select.Option value="preview">Preview</Select.Option>
                <Select.Option value="released">Released</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item {...formItemLayoutWithOutLabel}>
              <Space direction="horizontal" size={"large"}>
                <Button
                  type="primary"
                  htmlType="submit"
                  //   style={{ width: "60%" }}
                  icon={<CloudUploadOutlined />}
                >
                  Upload To Server
                </Button>

                <Button
                  type="primary"
                  //   style={{ width: "60%" }}
                  icon={<CloudUploadOutlined />}
                  onClick={cloneConfiguration}
                >
                  Clone as new configuration
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </>
      ) : (
        <Loader
          onDone={() => {
            setLoaderVisibility(false);
            onSavedSuccessfully();
          }}
        ></Loader>
      )}
    </div>
  );
};
export default PublishForm;
