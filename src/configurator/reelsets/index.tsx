import { Tabs, Button, Modal, Input } from "antd";

import {
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import ReelStrip from "./ReelStrip";
import { useState } from "react";
import ReelSet from "./ReelSet";
const { TabPane } = Tabs;

const ReelsetsForm = () => {
  const [newReelsetName, setNewReelsetName] = useState("");
  const [reelSets, setReelSets] = useState(["basic", "freespin"]);
  const [activeKey, setActiveKey] = useState("basic");

  const add = () => {
    if (newReelsetName.trim().length > 2) {
      setReelSets([...reelSets, newReelsetName]);
    }
  };
  const onChange = (selTab: string) => {
    setActiveKey(selTab);
  };
  const onEdit = (targetKey: any, action: "add" | "remove") => {
    if (action === "remove") {
      Modal.confirm({
        title: "Confirm",
        icon: <ExclamationCircleOutlined />,
        content: "Are you sure you want to delete this reelset?",
        okText: "Confirm",
        cancelText: "Cancel",
        onOk() {
          const updatedReelSets = reelSets.filter((rs) => rs !== targetKey);
          setReelSets(updatedReelSets);
          setActiveKey(updatedReelSets[0]);
        },
      });
    }
  };
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Input
          value={newReelsetName}
          onChange={(e: any) => {
            debugger;
            setNewReelsetName(e.target.value);
          }}
        ></Input>
        <Button onClick={add}>ADD</Button>
      </div>
      <Tabs
        hideAdd
        onChange={onChange}
        activeKey={activeKey}
        type="editable-card"
        onEdit={onEdit}
      >
        {reelSets.map((pane) => (
          <TabPane tab={pane} key={pane}>
            <ReelSet reelset={pane} />
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};
export default ReelsetsForm;
