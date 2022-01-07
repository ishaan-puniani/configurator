import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input, Button, InputNumber, Select, Row } from "antd";
import { useState } from "react";

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
const ForecastOddsForm = ({
  data,
  path,
  numberOfBetLines,
  handlePatch,
}: any) => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    handlePatch(values);
    console.log("Received values of form:", values);
  };
  debugger;

  if (!data[path]) {
    data[path] = [];
  }
  if (data[path]) {
    data.runnerIds.forEach((runnerId: string, idx: number) => {
      data.runnerIds.forEach((jRunnerId: string, jIdx: number) => {
        if (runnerId !== jRunnerId) {
          data[path].push({
            first: runnerId,
            second: jRunnerId,
            key: `${runnerId}_${jRunnerId}`,
          });
        }
      });
      //   const ruunerInfo = data[path][idx];
      //   if (!ruunerInfo) {
      //     data[path].push({ id: runnerId });
      //   } else {
      //     ruunerInfo.id = runnerId;
      //   }
    });
  }

  return (
    <Form
      name="forecast_runners_form"
      {...formItemLayoutWithOutLabel}
      onFinish={onFinish}
      form={form}
      initialValues={{
        [path]: data[path],
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
        <h3>Runners Forecast</h3>
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
                  label={`Forecast Runner: ${index}:`}
                  required={false}
                  key={field.key}
                >
                  <div style={{ display: "none" }}>
                    <Form.Item name={[field.name, "key"]}>
                      <Input
                        placeholder="key"
                        style={{ width: "60%" }}
                        disabled
                      />
                    </Form.Item>
                  </div>
                  <Form.Item name={[field.name, "first"]}>
                    <Input
                      placeholder="first"
                      style={{ width: "60%" }}
                      disabled
                    />
                  </Form.Item>
                  <Form.Item name={[field.name, "second"]}>
                    <Input
                      placeholder="second"
                      style={{ width: "60%" }}
                      disabled
                    />
                  </Form.Item>
                  <Form.Item name={[field.name, "payout"]}>
                    <InputNumber
                      placeholder="payout"
                      style={{ width: "60%" }}
                    />
                  </Form.Item>
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
        )
      </>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ForecastOddsForm;

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
