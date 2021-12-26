import { Form, Input, Button, InputNumber } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
const symArray = ["sym1", "sym2"];

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

const PaytableForm = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
  };

  return (
    <Form
      name="dynamic_form_item"
      {...formItemLayoutWithOutLabel}
      onFinish={onFinish}
      initialValues={{
        paytableObj: {
          sym1: [
            {
              freespins: 0,
              multiplier: 0,
              number: 0,
              type: "scatter",
            },
            {
              freespins: 2,
              multiplier: 5,
              number: 5,
              type: "scatter",
            },
            {
              freespins: 5,
              multiplier: 6,
              number: 7,
              type: "scatter",
            },
          ],
        },
      }}
    >
      <h3>Paytable</h3>
      {symArray.map((sym) => (
        <Form.List
          name={["paytableObj", sym]}
          rules={[
            {
              validator: async (_, names) => {
                if (!names || names.length < 2) {
                  return Promise.reject(new Error("At least 2 passengers"));
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              <h4>{sym}</h4>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0
                    ? formItemLayout
                    : formItemLayoutWithOutLabel)}
                  label={index === 0 ? "Passengers" : ""}
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
                    <Input placeholder="type" style={{ width: "60%" }} />
                  </Form.Item>

                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
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
