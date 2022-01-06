import { Form, Input, Button, InputNumber, Checkbox } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

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

const PaytableForm = ({ data, path, symbols, handlePatch }: any) => {
  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
    handlePatch(values);
  };

  return (
    <Form
      name="paytable_form"
      {...formItemLayoutWithOutLabel}
      onFinish={onFinish}
      initialValues={{
        [path]: data[path] || {},
        // paytableObj: {
        //   sym1: [
        //     {
        //       freespins: 0,
        //       multiplier: 0,
        //       number: 0,
        //       type: "scatter",
        //     },
        //     {
        //       freespins: 2,
        //       multiplier: 5,
        //       number: 5,
        //       type: "scatter",
        //     },
        //     {
        //       freespins: 5,
        //       multiplier: 6,
        //       number: 7,
        //       type: "scatter",
        //     },
        //   ],
        // },
      }}
    >
      <h3>Paytable</h3>
      {symbols.map((sym: string) => (
        <Form.List
          name={[path, sym]}
          rules={[
            {
              validator: async (_, names) => {
                return Promise.resolve();
                // if (!names || names.length < 2) {
                //   return Promise.reject(new Error("At least 2 passengers"));
                // }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              <h4>{sym}</h4>
              {fields.map((field, index) => (
                <Form.Item
                  {...formItemLayout}
                  label={`payout: ${index}`}
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    name={[field.name, "number"]}
                    // key={[field.key, "number"]}
                    noStyle
                  >
                    <InputNumber
                      placeholder="number"
                      style={{ width: "60%" }}
                    />
                  </Form.Item>
                  <Form.Item
                    name={[field.name, "multiplier"]}
                    // key={[field.key, "number"]}
                    noStyle
                  >
                    <InputNumber
                      placeholder="multiplier"
                      style={{ width: "60%" }}
                    />
                  </Form.Item>
                  <Form.Item
                    name={[field.name, "freespins"]}
                    // key={[field.key, "number"]}
                    noStyle
                  >
                    <InputNumber
                      placeholder="freespins"
                      style={{ width: "60%" }}
                    />
                  </Form.Item>
                  <Form.Item
                    name={[field.name, "type"]}
                    // key={[field.key, "number"]}
                    noStyle
                  >
                    <Form.Item
                      name={[field.name, "hidden"]}
                      valuePropName="checked"
                    >
                      <Checkbox>Hidden</Checkbox>
                    </Form.Item>
                    <Input placeholder="type" style={{ width: "60%" }} />
                  </Form.Item>

                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  />
                </Form.Item>
              ))}
              <Form.Item {...formItemLayoutWithOutLabel}>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{ width: "60%" }}
                  icon={<PlusOutlined />}
                >
                  Add Pay for symbol {sym}
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
      ))}

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default PaytableForm;
