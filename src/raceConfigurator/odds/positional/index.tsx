import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input, Button, InputNumber, Select, Row } from "antd";
import { useState } from "react";
import PositionalPayoutForm from "./payout";

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
const PositionalOddsForm = ({
  data,
  positionalData,
  path,
  handlePatch,
}: any) => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    handlePatch(values);
    console.log("Received values of form:", values);
  };
  return (
    <Form
      name="positional_runners_form"
      {...formItemLayoutWithOutLabel}
      onFinish={onFinish}
      form={form}
      initialValues={{
        [path]: positionalData[path],
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
                  label={`Position: ${index}:`}
                  required={false}
                  key={field.key}
                >
                  <Form.Item name={[field.name, "key"]}>
                    <Input placeholder="key" style={{ width: "60%" }} />
                  </Form.Item>
                  <Form.Item name={[field.name, "title"]}>
                    <Input placeholder="title" style={{ width: "60%" }} />
                  </Form.Item>
                  <Form.Item name={[field.name, "payouts"]}>
                    {data.runnerIds.map((runner: string) => {
                      return (
                        <Form.Item
                          name={[field.name, "payout", runner]}
                          label={runner}
                        >
                          <Input
                            placeholder={runner}
                            style={{ width: "60%" }}
                          />
                        </Form.Item>
                      );
                    })}
                  </Form.Item>
                  {/* <Form.Item name={[field.name, "payout"]}> */}
                  {/* <Form.List name={[field.name, "payouts"]}>
                    {(
                      categoryPayoutFields,
                      { add: addCategoryPayout, remove: removeCategoryPayout },
                      { errors: errorsCategoryPayout }
                    ) => (
                      <>
                        {categoryPayoutFields.map((catField, catIndex) => (
                          <Form.Item
                            label={`Runner Payout: ${catIndex}:`}
                            required={false}
                            key={catField.key}
                          >
                            <Form.Item name={[catField.name, "runner"]}>
                              <Input
                                placeholder="runner"
                                style={{ width: "60%" }}
                              />
                            </Form.Item>
                            <Form.Item name={[catField.name, "payout"]}>
                              <InputNumber
                                placeholder="payout"
                                style={{ width: "60%" }}
                              />
                            </Form.Item>
                          </Form.Item>
                        ))}

                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => addCategoryPayout()}
                            style={{ width: "60%" }}
                            icon={<PlusOutlined />}
                          >
                            Add Payout
                          </Button>
                          <Form.ErrorList errors={errors} />
                        </Form.Item>
                      </>
                    )}
                  </Form.List> */}
                  {/* </Form.Item> */}

                  {/* <Form.Item name={[field.name, "number"]}>
                    <InputNumber
                      placeholder="number"
                      style={{ width: "60%" }}
                    />
                  </Form.Item> */}

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
                  Add BetLine
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
      </>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PositionalOddsForm;

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
