import { Form, Input, Button, InputNumber, Select, Row, Modal } from "antd";
import {
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
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

const BasicInfoForm = ({ data, handleCreate, handlePatch }: any) => {
  const [winType, setWinType] = useState<string>(
    data ? data.wincalculator : ""
  );
  const [reelLinking, setReelLinking] = useState<string>(
    data ? data.reelLinking : ""
  );

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Success:", values);
    handleCreate(values);
  };
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
        handlePatch({ ...formValue });
      },
    });
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
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
        help={
          "All symbols including wild and scatter eg: sym0,sym1,sym3,sym4,sym5,sym6,sym7,sym8,sym9,sym10"
        }
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
      <TagInput
        name="scattersymbols"
        form={form}
        label="scattersymbols"
        rules={[{ required: true, message: "Please input symbols!" }]}
        help={"Subset of symbols"}
      ></TagInput>
      <TagInput
        name="wildsymbols"
        form={form}
        label="wildsymbols"
        rules={[{ required: true, message: "Please input symbols!" }]}
        help={"Subset of symbols"}
      ></TagInput>
      <Form.Item name={"wildBehaviour"} label="wildBehaviour">
        <Select>
          <Select.Option value="">None</Select.Option>
          <Select.Option value="trigger-respin">
            Trigger Respin
          </Select.Option>
          <Select.Option value="random-trigger-respin" disabled>
            Random Wild and Respin
          </Select.Option>
          <Select.Option value="stick-and-trigger-respin" disabled>
            Stick and Trigger Respin
          </Select.Option>
          <Select.Option value="walk-left-and-trigger-respin" disabled>
            Walk to left and Trigger Respin
          </Select.Option>
          <Select.Option value="expand-trigger-respin" disabled>
            Expand Wild and Respin
          </Select.Option>
        </Select>
      </Form.Item>

      <TagInput
        name="burstableSymbols"
        form={form}
        label="burstableSymbols"
        help={"Subset of symbols"}
      ></TagInput>

      <Form.Item name={"bonusGame"} label="bonusGame">
        <Select>
          <Select.Option value="">None</Select.Option>
          <Select.Option value="pickandchooseitems">
            Pick and Choose Items
          </Select.Option>
          <Select.Option value="snakesandladders">
            Snakes And Ladders
          </Select.Option>
        </Select>
      </Form.Item>
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

export default BasicInfoForm;
