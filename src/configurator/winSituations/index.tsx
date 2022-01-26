import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input, Button, InputNumber, Select, Row } from "antd";
import { useState } from "react";
import Betline from "./Betline";

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
const WinSituations = ({ data, path, numberOfBetLines, handlePatch }: any) => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    handlePatch(values);
    console.log("Received values of form:", values);
  };
  return (
    <Form
      name="paytable_form"
      {...formItemLayoutWithOutLabel}
      onFinish={onFinish}
      form={form}
      initialValues={{
        [path]: data[path] || [...new Array(numberOfBetLines)],
        // betlines: [
        //   {
        //     number: 0,
        //     line: [1, 1, 1, 1, 1],
        //   },
        //   {
        //     number: 1,
        //     line: [1, 1, 1, 1, 1],
        //   },
        // ],
      }}
    >
      {data.wincalculator === "betlines" && (
        <>
          <h3>Bet Lines</h3>
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
                    label={`Betline: ${index}:`}
                    required={false}
                    key={field.key}
                  >
                    <Form.Item name={[field.name, "number"]}>
                      <InputNumber
                        placeholder="number"
                        style={{ width: "60%" }}
                      />
                    </Form.Item>
                    <Betline
                      name={"line"}
                      field={field}
                      fieldPath={[path, field.name]}
                      form={form}
                    ></Betline>

                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                    />
                  </Form.Item>
                ))}
                {/* <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    style={{ width: "60%" }}
                    icon={<PlusOutlined />}
                  >
                    Add BetLine
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item> */}
              </>
            )}
          </Form.List>
          )
        </>
      )}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default WinSituations;

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
