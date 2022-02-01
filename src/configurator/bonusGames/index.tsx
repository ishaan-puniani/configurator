import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input, Button, InputNumber, Select, Row } from "antd";
import { useState } from "react";
import { parseClubbedSymbols } from "../../utilities/colossalSymbls";
import TagInputForChild from "../basicInfo/TagInputForChild";
import TagInputForChildWithName from "../basicInfo/TagInputForChildWithName";

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
const BonusGameConfiguration = ({ data, path, handlePatch }: any) => {
  const symbolsSuggestions: Array<{
    id: string;
    text: string;
  }> = [...data.availableSymbols, ...parseClubbedSymbols(data)].map((sym: string) => ({
    id: sym,
    text: sym,
  }));
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log(values);
    handlePatch({ [path]: values });
  };
  return (
    <Form
      name="bonusGameConfig_form"
      {...formItemLayoutWithOutLabel}
      onFinish={onFinish}
      form={form}
      initialValues={{
        ...(data[path] || {}),
      }}
    >
      <>
        <h3>Bonus Game Config</h3>
        {data && data.bonusGame === "snakesandladders" && (
          <>
            <h5>
              In this game the last position of pawn on snakes and ladders board
              will be the bet multiplier{" "}
            </h5>
            <Form.List
              name={["triggers"]}
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
                      label={`Trigger: ${index}:`}
                      required={false}
                      key={field.key}
                    >
                      <TagInputForChildWithName
                        label={`Any of symbols : `}
                        fieldPath={["triggers"]}
                        name="symbols"
                        field={field}
                        form={form}
                        subName="symbols"
                        symbolsSuggestions={symbolsSuggestions}
                        // rules={[
                        //   {
                        //     required: true,
                        //     message: "Please input LinkableReels!",
                        //   },
                        // ]}
                      ></TagInputForChildWithName>
                      {/* <Form.Item name={[field.name, "symbols"]}>
                        <Input placeholder="symbols" style={{ width: "60%" }} />
                      </Form.Item> */}
                      <Form.Item name={[field.name, "count"]}>
                        <InputNumber
                          placeholder="count"
                          style={{ width: "60%" }}
                        />
                      </Form.Item>
                      <Form.Item name={[field.name, "dicerolls"]}>
                        <InputNumber
                          placeholder="dicerolls"
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
                      Add Bonus Triggers
                    </Button>
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              )}
            </Form.List>
          </>
        )}
        {data && data.bonusGame === "pickandchooseitems" && (
          <>
            <h5>
              In this game the bonus will be awarded for the awards picked by
              player
            </h5>
            <Form.List
              name={["triggers"]}
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
                      label={`Trigger: ${index}:`}
                      required={false}
                      key={field.key}
                    >
                      <TagInputForChildWithName
                        label={`Any of symbols : `}
                        fieldPath={["triggers"]}
                        name="symbols"
                        field={field}
                        form={form}
                        subName="symbols"
                        symbolsSuggestions={symbolsSuggestions}
                        // rules={[
                        //   {
                        //     required: true,
                        //     message: "Please input LinkableReels!",
                        //   },
                        // ]}
                      ></TagInputForChildWithName>
                      <Form.Item name={[field.name, "count"]}>
                        <InputNumber
                          placeholder="count"
                          style={{ width: "60%" }}
                        />
                      </Form.Item>
                      <Form.Item name={[field.name, "picks"]}>
                        <InputNumber
                          placeholder="picks"
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
                      Add Bonus Triggers
                    </Button>
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.List
              name={["awards"]}
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
                      label={`Award: ${index}:`}
                      required={false}
                      key={field.key}
                    >
                      <Form.Item name={[field.name, "identifier"]}>
                        <Input
                          placeholder="identifier"
                          style={{ width: "60%" }}
                        />
                      </Form.Item>
                      <Form.Item name={[field.name, "number"]}>
                        <InputNumber
                          placeholder="number"
                          style={{ width: "60%" }}
                        />
                      </Form.Item>
                      <Form.Item name={[field.name, "type"]}>
                        <Select>
                          <Select.Option value="freespin">
                            Freespin
                          </Select.Option>
                          <Select.Option value="money">Money</Select.Option>
                          <Select.Option value="multiplier">
                            Multiplier
                          </Select.Option>
                        </Select>
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
                      Add Bonus Awards
                    </Button>
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              )}
            </Form.List>
          </>
        )}
      </>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BonusGameConfiguration;
