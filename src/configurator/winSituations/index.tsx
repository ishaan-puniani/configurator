import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input, Button, InputNumber, Select, Row } from "antd";
import { useState } from "react";
import Betline from "./Betline";

const WinSituations = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
  };

  return (
    <Form
      form={form}
      name="winSituationsForm"
      onFinish={onFinish}
      autoComplete="off"
      initialValues={{
        betlines: [
          { number: "1", line: ["1", "0", "0", "0", "1"] },
          { number: "2", line: ["1", "1", "1", "1", "1"] },
          { number: "3", line: ["0", "0", "0", "0", "0"] },
        ],
      }}
    >
      <h3>Betlines</h3>
      <Form.List
        name="betlines"
        rules={
          [
            //   {
            //     validator: async (_, names) => {
            //       if (!names || names.length < 2) {
            //         return Promise.reject(new Error("At least 2 passengers"));
            //       }
            //     },
            //   },
          ]
        }
      >
        {(fields, { add, remove }, { errors }) => {
          return (
            <>
              {fields.map((field, index) => (
                <Row>
                  <Form.Item
                    label={`Betline:${field.key}`}
                    required={false}
                    key={field.key}
                  >
                    <Betline
                      fieldPath={["betlines"]}
                      field={field}
                      form={form}
                    />
                  </Form.Item>
                  {/* <MinusCircleOutlined
                    onClick={() => {
                      debugger;
                      remove(field.name);
                    }}
                  /> */}
                </Row>
              ))}
              <Form.Item>
                {/* <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add BetLine
                </Button> */}
              </Form.Item>
              <Form.Item>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          );
        }}
      </Form.List>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default WinSituations;
