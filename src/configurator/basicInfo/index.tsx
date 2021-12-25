import { Form, Input, Button, InputNumber, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const BasicInfoForm = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="clientId"
        name="clientId"
        rules={[{ required: true, message: "Please input clientId!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="name"
        name="name"
        rules={[{ required: true, message: "Please input name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="numberOfReels"
        name="numberOfReels"
        rules={[{ required: true, message: "Please input numberOfReels!" }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="symbolsPerReel"
        name="symbolsPerReel"
        rules={[{ required: true, message: "Please input symbolsPerReel!" }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="symbols"
        name="symbols"
        rules={[{ required: true, message: "Please input symbols!" }]}
      >
        <Select
          mode="tags"
          style={{ width: "100%" }}
          placeholder="Please select"
          defaultValue={[]}
        ></Select>
      </Form.Item>
      <Form.Item
        label="gameModes"
        name="gameModes"
        rules={[{ required: true, message: "Please input gameModes!" }]}
      >
        <Select
          mode="tags"
          style={{ width: "100%" }}
          placeholder="Please select"
          defaultValue={[]}
        ></Select>
      </Form.Item>
      {/* <Form.Item
        name="dynamicReelLinking"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Dynamic Reel Linking</Checkbox>
      </Form.Item> */}
      <Form.Item name="reelLinking" label="reelLinking">
        <Select defaultValue="">
          <Select.Option value="">None</Select.Option>
          <Select.Option value="static">Static</Select.Option>
          <Select.Option value="dynamic">Dynamic</Select.Option>
          <Select.Option value="static_chuncked">Static Chuncked</Select.Option>
          <Select.Option value="dynamic_chuncked">
            Dynamic Chuncked
          </Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="connectedReels"
        name="connectedReels"
        rules={[{ required: false }]}
      >
        <Select
          mode="tags"
          style={{ width: "100%" }}
          placeholder="Please select"
          defaultValue={[]}
        ></Select>
      </Form.Item>

      <Form.List
        name="availableLinkableReels"
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
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                // {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                //label={index === 0 ? "Passengers" : ""}
                label="availableLinkableReels"
                required={false}
                key={field.key}
              >
                {/* <Form.Item
                  {...field}
                  validateTrigger={["onChange", "onBlur"]}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message:
                        "Please input passenger's name or delete this field.",
                    },
                  ]}
                  noStyle
                >
                  <Input
                    placeholder="passenger name"
                    style={{ width: "60%" }}
                  />
                    </Form.Item>
                     */}
                <Form.Item
                  name={field.key}
                  rules={[
                    {
                      validator: (rule, value) => {
                        debugger;
                        console.log(form.getFieldValue("dynamicReelLinking"));
                        console.log(form.getFieldValue("clientId"));
                        return value.length > 2
                          ? Promise.resolve()
                          : Promise.reject(new Error("Should be a number"));
                      },
                    },
                  ]}
                >
                  <Select
                    mode="tags"
                    style={{ width: "100%" }}
                    placeholder="Please select"
                    defaultValue={[]}
                  ></Select>
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
                Add field
              </Button>
              <Button
                type="dashed"
                onClick={() => {
                  add("The head item", 0);
                }}
                style={{ width: "60%", marginTop: "20px" }}
                icon={<PlusOutlined />}
              >
                Add field at head
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BasicInfoForm;
