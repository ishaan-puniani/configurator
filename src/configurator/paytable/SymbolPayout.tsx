import { Form, Input, Button, InputNumber, Select } from "antd";

const SymbolPayout = ({ fieldPath, field, form }: any) => {
  return (
    <>
      <Form.Item
        label="number"
        name={[field.key, "number"]}
        rules={[{ required: true, message: "Please provide number!" }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="multiplier"
        name={[field.key, "multiplier"]}
        rules={[{ required: true, message: "Please multiplier number!" }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="freespins"
        name={[field.key, "freespins"]}
        rules={[{ required: true, message: "Please freespins number!" }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item label="type" name={[field.key, "type"]}>
        <Input />
      </Form.Item>
    </>
  );
};

export default SymbolPayout;
