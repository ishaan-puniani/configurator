import { Button } from "antd";
import axios from "axios";
import { getData } from "../../storage";

const PublishForm = () => {
  const uploadToServer = async () => {
    const configuration = getData();
    var data = JSON.stringify({
      gameid: "slot-linked-server",
      ...configuration,
      configurator: "v0.0.1",
    });
    var config = {
      method: "post",
      url: "https://ml-search-mhwiw.ondigitalocean.app/api/student/set-config",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    //@ts-ignore
    const update = await axios(config);
    console.log(update);
  };
  return (
    <div>
      <Button onClick={uploadToServer}>Upload To Server</Button>
    </div>
  );
};
export default PublishForm;
