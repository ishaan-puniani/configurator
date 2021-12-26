import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input, Button, InputNumber, Select, Row } from "antd";
import { useState } from "react";
import SymbolPayout from "./SymbolPayout";
const symArray = ["sym1", "sym2"];
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
            {
              freespins: 5,
              multiplier: 6,
              number: 7,
              type: "scatter",
            },
          ],
        },
      }}
    >
      <h3>Paytable</h3>
      {symArray.map((sym) => (
        <Form.Item label={`paytableObj`} required={false} name={"paytableObj"}>
          <Form.List
            name={["paytableObj", sym]}
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
                    <>
                      <h4>{index}</h4>
                      <Row>
                        <Form.Item
                          label={`${sym} - Payout:${field.key}`}
                          required={false}
                          key={`${sym} - Payout:${field.key}`}
                        >
                          <SymbolPayout
                            fieldPath={[sym]}
                            field={field}
                            form={form}
                            key={`${sym} - Payout:${field.key}`}
                          />
                        </Form.Item>
                        <MinusCircleOutlined
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      </Row>
                    </>
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
                      Add Payoyr for {sym}
                    </Button>
                  </Form.Item>
                </>
              );
            }}
          </Form.List>
        </Form.Item>
      ))}

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Paytable;
