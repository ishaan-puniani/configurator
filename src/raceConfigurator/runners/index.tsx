import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input, Button, InputNumber, Select, Row } from "antd";
import { useState } from "react";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};
const RunnersInformationForm = ({
  data,
  path,
  numberOfBetLines,
  handlePatch,
}: any) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    handlePatch(values);
    console.log("Received values of form:", values);
  };

  if (!data[path]) {
    data[path] = [];
  }

  if (data[path]) {
    data.runnerIds.forEach((runnerId: string, idx: number) => {
      const ruunerInfo = data[path][idx];
      if (!ruunerInfo) {
        data[path].push({ id: runnerId });
      } else {
        ruunerInfo.id = runnerId;
      }
    });
    data[path] = data[path].slice(0, data.numberOfRunners);
  }

  return (
    <Form
      name="RunnersInformationForm"
      {...formItemLayoutWithOutLabel}
      onFinish={onFinish}
      form={form}
      initialValues={{
        [path]: data[path],
      }}
    >
      <>
        <h3>Runners Information</h3>
        <Form.List
          name={[path]}
          rules={[
            {
              validator: async (_, names) => {
                // if (!names || names.length < 2) {
                //   return Promise.reject(new Error("At least 2 passengers"));
                // }
                return Promise.resolve();
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  {...formItemLayout}
                  label={`Runner: ${index}:`}
                  required={false}
                  key={field.key}
                >
                  <Form.Item name={[field.name, "id"]}>
                    <Input placeholder="id" style={{ width: "60%" }} disabled />
                  </Form.Item>
                  <Form.Item name={[field.name, "name"]}>
                    <Input placeholder="name" style={{ width: "60%" }} />
                  </Form.Item>

                  <Form.Item name={[field.name, "age"]}>
                    <InputNumber placeholder="age" style={{ width: "60%" }} />
                  </Form.Item>

                  <Form.Item name={[field.name, "riderName"]}>
                    <Input placeholder="riderName" style={{ width: "60%" }} />
                  </Form.Item>
                  <Form.Item name={[field.name, "riderAge"]}>
                    <Input placeholder="riderAge" style={{ width: "60%" }} />
                  </Form.Item>

                  <Form.Item name={[field.name, "title"]}>
                    <Input placeholder="title" style={{ width: "60%" }} />
                  </Form.Item>
                  <Form.Item name={[field.name, "subTitle"]}>
                    <Input placeholder="subTitle" style={{ width: "60%" }} />
                  </Form.Item>
                  <Form.Item name={[field.name, "shortDescription"]}>
                    <Input
                      placeholder="shortDescription"
                      style={{ width: "60%" }}
                    />
                  </Form.Item>
                  <Form.Item name={[field.name, "topSpeed"]}>
                    <Input placeholder="topSpeed" style={{ width: "60%" }} />
                  </Form.Item>
                  <Form.Item name={[field.name, "acceleration"]}>
                    <Input
                      placeholder="acceleration"
                      style={{ width: "60%" }}
                    />
                  </Form.Item>
                  <Form.Item name={[field.name, "rating"]}>
                    <InputNumber
                      placeholder="rating"
                      style={{ width: "60%" }}
                    />
                  </Form.Item>

                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  />
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{ width: "60%" }}
                  icon={<PlusOutlined />}
                >
                  Add Runner
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
        )
      </>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RunnersInformationForm;
