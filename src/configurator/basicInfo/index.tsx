import { Form, Input, Button, InputNumber, Select, Row } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import TagInput from "./TagInput";
import TagInputForChild from "./TagInputForChild";

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

const BasicInfoForm = ({ data, handleCreate }: any) => {
  const [winType, setWinType] = useState<string>(
    data ? data.wincalculator : ""
  );
  const [reelLinking, setReelLinking] = useState<string>(
    data ? data.reelLinking : ""
  );

  const onFinish = (values: any) => {
    console.log("Success:", values);
    handleCreate(values);
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
      initialValues={data}
      onFinish={onFinish}
      //  onFinishFailed={onFinishFailed}
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
        name={"wincalculator"}
        label="wincalculator"
        rules={[{ required: true, message: "Please input wincalculator!" }]}
      >
        <Select onChange={(selValue: string) => setWinType(selValue)}>
          <Select.Option value="betlines">Betlines</Select.Option>
          <Select.Option value="betways">Betways</Select.Option>
        </Select>
      </Form.Item>
      {winType === "betlines" && (
        <Form.Item
          label="numberOfBetLines"
          name="numberOfBetLines"
          rules={[
            { required: true, message: "Please input numberOfBetLines!" },
          ]}
        >
          <InputNumber />
        </Form.Item>
      )}

      <TagInput
        name="symbols"
        form={form}
        label="symbols"
        rules={[{ required: true, message: "Please input symbols!" }]}
      ></TagInput>
      <TagInput
        name="clubbedSymbols"
        form={form}
        label="clubbedSymbols"
      ></TagInput>
      <TagInput
        name="gameModes"
        form={form}
        label="gameModes"
        rules={[{ required: true, message: "Please input gameModes!" }]}
      ></TagInput>

      {/* <Form.Item
        name="dynamicReelLinking"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Dynamic Reel Linking</Checkbox>
      </Form.Item> */}
      <Form.Item name="reelLinking" label="reelLinking">
        <Select
          onChange={(selReelLinking: string) => setReelLinking(selReelLinking)}
          defaultActiveFirstOption
        >
          <Select.Option value={0}>None</Select.Option>
          <Select.Option value="static">Static</Select.Option>
          <Select.Option value="dynamic">Dynamic</Select.Option>
          <Select.Option value="static_chuncked" disabled>
            Static Chuncked
          </Select.Option>
          <Select.Option value="dynamic_chuncked" disabled>
            Dynamic Chuncked
          </Select.Option>
        </Select>
      </Form.Item>
      {reelLinking === "static" && (
        <TagInput
          name="connectedReels"
          form={form}
          label="connectedReels"
          valueType="integer"
          rules={[{ required: true, message: "Please input connectedReels!" }]}
        ></TagInput>
      )}
      {reelLinking === "dynamic" && (
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
                <Row>
                  <TagInputForChild
                    label={`LinkableReels ${index}: `}
                    fieldPath={["availableLinkableReels"]}
                    field={field}
                    form={form}
                    valueType="integer"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Please input LinkableReels!",
                    //   },
                    // ]}
                  ></TagInputForChild>
                  {/* <Form.Item
                    name={field.name}
                    rules={[
                      {
                        validator: (rule, value) => {
                          return Promise.resolve();
                          // console.log(form.getFieldValue("dynamicReelLinking"));
                          // console.log(form.getFieldValue("clientId"));
                          // return value.length > 2
                          //   ? Promise.resolve()
                          //   : Promise.reject(new Error("Should be a number"));
                        },
                      },
                    ]}
                  >
                    <Select
                      mode="tags"
                      style={{ width: "80%" }}
                      placeholder="Please select"
                      defaultValue={[]}
                    ></Select>
                  </Form.Item> */}
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  />
                </Row>
              ))}
              <Form.Item {...formItemLayoutWithOutLabel}>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{ width: "60%" }}
                  icon={<PlusOutlined />}
                >
                  Add Linkable reel
                </Button>

                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
      )}
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BasicInfoForm;
