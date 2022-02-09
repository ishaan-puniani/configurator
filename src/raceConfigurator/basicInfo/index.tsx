import { Form, Input, Button, InputNumber, Select, Row, Modal } from "antd";
import {
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useState } from "react";

export const BasicInfo = ({ data, handleCreate, handlePatch }: any) => {
  const [form] = Form.useForm();

  const patchExisting = () => {
    Modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: (
        <div>
          <h3>Are you sure you want to update?</h3>
          <p>
            Do note that this might be a breaking change for rest of the
            configuration!
          </p>
          <p>
            Please revist all other tabs to ensure that your update in
            compatible
          </p>
        </div>
      ),

      okText: "Confirm And Update",
      cancelText: "Cancel",
      onOk() {
        const formValue = form.getFieldsValue();

        const runnerIds = [];
        for (var idx = 0; idx < formValue.numberOfRunners; idx++) {
          runnerIds.push({ id: `runner_${idx + 1}` });
        }

        handlePatch({ ...formValue, runnerIds });
      },
    });
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
    const runnerIds = [];
    debugger;
    for (var idx = 0; idx < values.numberOfRunners; idx++) {
      runnerIds.push(`runner_${idx + 1}`);
    }
    handleCreate({ ...values, runnerIds });
  };
  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ ...data }}
      onFinish={onFinish}
      //  onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        name={"clientId"}
        label="clientId"
        rules={[{ required: true, message: "Please input clientId!" }]}
      >
        <Select>
          <Select.Option value="horse">Horse</Select.Option>
          <Select.Option value="greyhound">Greyhound</Select.Option>
          <Select.Option value="athelete" disabled>
            Athelete
          </Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name={"raceType"}
        label="raceType"
        rules={[{ required: true, message: "Please input raceType!" }]}
      >
        <Select>
          <Select.Option value="single-lap">Single Lap</Select.Option>
          <Select.Option value="multi-lap-single-bet" disabled>
            Multi Lap, Single Bet
          </Select.Option>
          <Select.Option value="multi-lap-multi-bet" disabled>
            Multi Lap, Multi Bet
          </Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="laps"
        name="laps"
        rules={[{ required: true, message: "Please input laps!" }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="numberOfRunners"
        name="numberOfRunners"
        rules={[{ required: true, message: "Please input numberOfRunners!" }]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item name={"bettingModes"} label="bettingModes">
        <Select mode="multiple">
          <Select.Option value="forecast">By Forecase</Select.Option>
          <Select.Option value="positional">By Position</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Create New
        </Button>
        {data?.configid && (
          <Button type="default" onClick={patchExisting}>
            Update
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};
