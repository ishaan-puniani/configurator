import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input, Button, InputNumber, Select } from "antd";

const ReelStrip = ({ form }: any) => {
  return (
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
                <Input />
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
  );
};

export default ReelStrip;
