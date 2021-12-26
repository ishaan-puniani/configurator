import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input, Button, InputNumber, Select, Row } from "antd";
import { useState } from "react";
import SymbolPayout from "./SymbolPayout";

const Paytable = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
  };

  return (
    <Form
      form={form}
      name="paytableForm"
      onFinish={onFinish}
      autoComplete="off"
      initialValues={{
        paytableObj: {
          sym1: [
            {
              freespins: 0,
              multiplier: 0,
              number: 0,
              type: "scatter",
            },
            {
              freespins: 2,
              multiplier: 5,
              number: 5,
              type: "scatter",
            },
          ],
        },
      }}
    >
      <h3>Paytable</h3>
      <Form.Item
        label={`paytableObj`}
        required={false}
        key={"x"}
        name={"paytableObj"}
      >
        <Form.List
          name={["paytableObj", "sym1"]}
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
                      label={`Symbol:${field.key}`}
                      required={false}
                      key={field.key}
                    >
                      <SymbolPayout
                        fieldPath={["sym1"]}
                        field={field}
                        form={form}
                      />
                    </Form.Item>
                    <MinusCircleOutlined
                      onClick={() => {
                        debugger;
                        remove(index);
                      }}
                    />
                  </Row>
                ))}

                <Form.Item>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Payoyr for sym 1
                  </Button>
                </Form.Item>
              </>
            );
          }}
        </Form.List>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Paytable;
