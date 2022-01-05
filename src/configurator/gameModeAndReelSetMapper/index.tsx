import { Form, Input, Button, InputNumber, Select } from "antd";
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

const GameModeAndReelSetMapper = ({ data, path, handlePatch }: any) => {
  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
    handlePatch(values);
  };

  return (
    <Form
      name="gamemode_reelset_mapping_form"
      {...formItemLayoutWithOutLabel}
      onFinish={onFinish}
      initialValues={
        {
          [path]: data[path],
          defaultReelset: data["defaultReelset"],
        }
        //       {
        // reelsetMapping: {
        //   basic: ["abc"],
        //   freespin: ["abc"],
        //   respin: ["abc"],
        // },
        //       }
      }
    >
      <h3>Game Modes and Reelset Mapping</h3>

      {data.gameModes.map((gameMode: string) => (
        <Form.Item
          label={gameMode}
          name={[path, gameMode]}
          rules={[{ required: true, message: "Please input reelsets!" }]}
        >
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Please select"
          >
            {Object.keys(data.availableReelsets || {}).map(
              (reelset: string) => (
                <Select.Option key={reelset} value={reelset}>
                  {reelset}
                </Select.Option>
              )
            )}
          </Select>
        </Form.Item>
      ))}
      <Form.Item
        name={"defaultReelset"}
        label="defaultReelset"
        rules={[{ required: true, message: "Please input defaultReelset!" }]}
      >
        <Select>
          {Object.keys(data.availableReelsets || {}).map((reelset: string) => (
            <Select.Option key={reelset} value={reelset}>
              {reelset}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default GameModeAndReelSetMapper;
