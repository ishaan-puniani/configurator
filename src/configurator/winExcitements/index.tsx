import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Select } from "antd";
import TagInputForChild from "../basicInfo/TagInputForChild";

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

export const WinExcitements = ({ data, path, handlePatch }: any) => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    handlePatch(values);
    console.log("Received values of form:", values);
  };
  return (
    <Form
      name="winExcitements_form"
      {...formItemLayoutWithOutLabel}
      onFinish={onFinish}
      form={form}
      initialValues={{ [path]: data[path] || {} }}
    >
      <>
        <h3>Win Types</h3>
        <Form.List
          name={[path, "wintypes"]}
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
                <Form.Item {...formItemLayout} required={false} key={field.key}>
                  <Form.Item name={[field.name, "wintype"]}>
                    <Select>
                      <Select.Option value="">None</Select.Option>
                      <Select.Option value="BIG_WIN">BIG_WIN</Select.Option>
                      <Select.Option value="MEGA_WIN">MEGA_WIN</Select.Option>
                      <Select.Option value="SUPER_MEGA_WIN">
                        SUPER_MEGA_WIN
                      </Select.Option>
                      <Select.Option value="COLOSSAL_WIN">
                        COLOSSAL_WIN
                      </Select.Option>
                      <Select.Option value="EPIC_WIN">EPIC_WIN</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item name={[field.name, "number"]}>
                    <InputNumber
                      placeholder="Start range value (multiplier) of bet which sets this type"
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
                  Add Win Type
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
      </>
      <>
        <h3>Near Win</h3>
        <Form.List
          name={[path, "nearwins"]}
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
                <Form.Item {...formItemLayout} required={false} key={field.key}>
                  {/* <Form.Item name={[field.name, "symbols"]}>
                    <Input placeholder="symbols" style={{ width: "60%" }} />
                  </Form.Item> */}
                  <TagInputForChild
                    // label={`LinkableReels ${index}: `}
                    fieldPath={[path, "nearwins", field.name, "symbols"]}
                    field={field}
                    form={form}
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Please input LinkableReels!",
                    //   },
                    // ]}
                  ></TagInputForChild>
                  <Form.Item name={[field.name, "count"]}>
                    <InputNumber
                      placeholder="Count (min) number of symbols that triggers this behaviour"
                      style={{ width: "60%" }}
                    />
                  </Form.Item>
                  <h3>Behaviour</h3>
                  <Form.Item name={[field.name, "time"]}>
                    <InputNumber
                      placeholder="Multiplier of reel spin time"
                      style={{ width: "60%" }}
                    />
                  </Form.Item>
                  <Form.Item name={[field.name, "speed"]}>
                    <InputNumber
                      placeholder="Multiplier of reel spin speed"
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
                  Add Near Behaviour
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
