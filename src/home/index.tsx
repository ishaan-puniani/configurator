import { Button, Form, Input } from "antd";
import axios from "axios";

const Home = ({ isLoggedIn, onLoginSuccess }: any) => {
  const onFinish = async (values: any) => {
    try {
      const signInUrl = "https://elantra-api.gameolive.com/api/auth/sign-in";
      const jtwResponse = await axios.post(signInUrl, values);
      if (jtwResponse) {
        localStorage.setItem("jwt", jtwResponse.data);
        onLoginSuccess(jtwResponse.data);
      } else {
        alert("OOPS!! Seems like, You are not a valid user");
      }
    } catch (ex) {
      alert("OOPS!! Seems like, You are not a valid user");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <h1>Welcome to Lucky Beetle Games</h1>
      {!isLoggedIn && (
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};
export default Home;
