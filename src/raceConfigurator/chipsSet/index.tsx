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
const ChipsSetForm = ({ data, path, handlePatch }: any) => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    handlePatch(values);
    console.log("Received values of form:", values);
  };
  return (
    <Form
      name="ChipsetInformationForm"
      {...formItemLayoutWithOutLabel}
      onFinish={onFinish}
      form={form}
      initialValues={{
        [path]: data[path] || [],
      }}
    >
      <>
        <h3>Chips Information</h3>
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
                  label={`Chip: ${index}:`}
                  required={false}
                  key={field.key}
                >
                  <Form.Item name={[field.name, "text"]}>
                    <Input placeholder="text" style={{ width: "60%" }} />
                  </Form.Item>
                  <Form.Item name={[field.name, "color"]}>
                    <Input placeholder="color" style={{ width: "60%" }} />
                  </Form.Item>

                  <Form.Item name={[field.name, "value"]}>
                    <InputNumber placeholder="value" style={{ width: "60%" }} />
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
                  Add Chip
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

export default ChipsSetForm;
