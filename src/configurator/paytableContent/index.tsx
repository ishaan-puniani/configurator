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
const PaytableContent = ({ data, path, handlePatch }: any) => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    handlePatch(values);
  };
  return (
    <Form
      name="paytableContanet_form"
      {...formItemLayoutWithOutLabel}
      onFinish={onFinish}
      form={form}
      initialValues={{
        [path]: data[path] || [],
      }}
    >
      <>
        <h3>Add Sections</h3>
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
                  label={`Section: ${index}:`}
                  required={false}
                  key={field.key}
                >
                  <Form.Item name={[field.name, "identifier"]}>
                    <Input placeholder="Identifier" style={{ width: "60%" }} />
                  </Form.Item>
                  <Form.Item name={[field.name, "placement"]}>
                    <Select placeholder="Placement" style={{ width: "60%" }}>
                      <Select.Option value="before_payouts">
                        Before Symbols Payout Grid
                      </Select.Option>
                      <Select.Option value="after_payouts">
                        After Symbols Payout Grid
                      </Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item name={[field.name, "sortOrder"]}>
                    <InputNumber
                      placeholder="Sort Order"
                      style={{ width: "60%" }}
                    />
                  </Form.Item>
                  <Form.Item name={[field.name, "title"]}>
                    <Input placeholder="Title" style={{ width: "60%" }} />
                  </Form.Item>
                  <Form.Item name={[field.name, "content"]}>
                    <Input.TextArea
                      placeholder="Content"
                      style={{ width: "60%" }}
                    />
                  </Form.Item>
                  <Form.Item name={[field.name, "image"]}>
                    <Input
                      placeholder="image name like sym3x3.png"
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
                  Add Section in paytable
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

export default PaytableContent;

// const Betline = ({ field }: any) => {
//   const [tags, setTags] = useState<Array<Tag>>(
//     form.getFieldValue([...fieldPath, field.name])
//       ? form
//           .getFieldValue([...fieldPath, field.name])
//           .map((tg: string, idx: number) => ({ id: "" + idx, text: tg }))
//       : []
//   );

//   return (
//     <Form.Item
//       name={[field.name, "line"]}
//       // key={[field.key, "number"]}
//       noStyle
//     >
//       <Input placeholder="multiplier" style={{ width: "60%" }} />
//     </Form.Item>
//   );
// };
