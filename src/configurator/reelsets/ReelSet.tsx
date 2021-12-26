import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input, Button, InputNumber, Select } from "antd";
import { useState } from "react";
import ReelStrip from "./ReelStrip";

const ReelSet = ({
  reelset,
  values,
  handleOnSave,
  numberOfReels,
}: {
  reelset: string;
  handleOnSave: any;
  values: any;
  numberOfReels: number;
}) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
    handleOnSave(values);
  };

  return (
    <Form
      form={form}
      name="reelsetForm"
      onFinish={onFinish}
      autoComplete="off"
      initialValues={{
        fakereels:
          values && values["fakereels"]
            ? [...values["fakereels"]]
            : [...new Array(numberOfReels)],
        reels:
          values && values["reels"]
            ? [...values["reels"]]
            : [...new Array(numberOfReels)],
        initial:
          values && values["initial"]
            ? [...values["initial"]]
            : [...new Array(numberOfReels)],
      }}
    >
      <h3>Fake Reels: {reelset}</h3>
      <Form.List
        name="fakereels"
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
                <Form.Item
                  label={`Strip:${field.key}`}
                  required={false}
                  key={field.key}
                >
                  <ReelStrip
                    fieldPath={["fakereels"]}
                    field={field}
                    form={form}
                  />
                </Form.Item>
              ))}
              <Form.Item>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          );
        }}
      </Form.List>
      <h3>Reels</h3>
      <Form.List
        name="reels"
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
                <Form.Item
                  label={`Strip:${field.key}`}
                  required={false}
                  key={field.key}
                >
                  <ReelStrip fieldPath={["reels"]} field={field} form={form} />
                </Form.Item>
              ))}
              <Form.Item>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          );
        }}
      </Form.List>
      <h3>Initial Symbols</h3>
      <Form.List
        name="initial"
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
                <Form.Item
                  label={`Strip:${field.key}`}
                  required={false}
                  key={field.key}
                >
                  <ReelStrip
                    fieldPath={["initial"]}
                    field={field}
                    form={form}
                  />
                </Form.Item>
              ))}
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

export default ReelSet;
