import { Form, Input, Button, InputNumber, Select, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import ReelStrip from "./ReelStrip";

const sights: any = {
  Beijing: ["Tiananmen", "Great Wall"],
  Shanghai: ["Oriental Pearl", "The Bund"],
};

const ReelsetsForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
  };

  const handleChange = () => {
    form.setFieldsValue({ sights: [] });
  };

  return (
    <Form
      form={form}
      name="reelsetsForm"
      onFinish={onFinish}
      autoComplete="off"
    >
      {/* <Form.Item
        name="area"
        label="Area"
        rules={[{ required: true, message: "Missing area" }]}
      >
        <Select options={areas} onChange={handleChange} />
      </Form.Item> */}
      <Form.List name="availableReelsets">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <Space key={field.key} align="baseline">
                <Form.Item
                  noStyle
                  //   shouldUpdate={(prevValues, curValues) =>
                  //     prevValues.area !== curValues.area ||
                  //     prevValues.sights !== curValues.sights
                  //   }
                >
                  {() => (
                    <Form.Item
                      {...field}
                      label="Sight"
                      name={[field.name, "sight"]}
                      fieldKey={[field.fieldKey, "sight"]}
                      rules={[{ required: true, message: "Missing sight" }]}
                    >
                      <Select
                        disabled={!form.getFieldValue("area")}
                        style={{ width: 130 }}
                      >
                        {(sights[form.getFieldValue("area")] || []).map(
                          (item: any) => (
                            <Select.Option key={item} value={item}>
                              {item}
                            </Select.Option>
                          )
                        )}
                      </Select>
                    </Form.Item>
                  )}
                </Form.Item>
                <ReelStrip form={form} />
                <Form.Item
                  {...field}
                  label="Price"
                  name={[field.name, "price"]}
                  fieldKey={[field.fieldKey, "price"]}
                  rules={[{ required: true, message: "Missing price" }]}
                >
                  <Input />
                </Form.Item>

                <MinusCircleOutlined onClick={() => remove(field.name)} />
              </Space>
            ))}

            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add sights
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default ReelsetsForm;
