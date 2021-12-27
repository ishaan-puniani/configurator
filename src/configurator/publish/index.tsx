import { CloudUploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Space } from "antd";
import axios from "axios";
import { useState } from "react";
import { getData, patch } from "../../storage";
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
    const configuration = getData();
    var data = JSON.stringify({
      gameid: "slot-linked-server",
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
              label="remark"
              name="remark"
              rules={[{ required: true, message: "Please input remarks!" }]}
            >
              <Input.TextArea />
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
