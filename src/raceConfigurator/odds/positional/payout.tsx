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
const PositionalPayoutForm = ({
  data,
  path,
  numberOfBetLines,
  handlePatch,
}: any) => {
  return (
    <>
      <h3>Runners Positional</h3>
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
                label={`Runner Payout: ${index}:`}
                required={false}
                key={field.key}
              >
                <Form.Item name={[field.name, "runner"]}>
                  <Input placeholder="key" style={{ width: "60%" }} />
                </Form.Item>
                <Form.Item name={[field.name, "payout"]}>
                  <InputNumber placeholder="payout" style={{ width: "60%" }} />
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
                Add Payout
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  );
};

export default PositionalPayoutForm;
