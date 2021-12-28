import { Tabs, Button, Modal, Input } from "antd";

import {
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import ReelStrip from "./ReelStrip";
import { useCallback, useState } from "react";
import ReelSet from "./ReelSet";
import { presetReelSets } from "../../utilities/reelsLinking";
const { TabPane } = Tabs;

const ReelsetsForm = ({ data, path, handlePatch }: any) => {
  const symbolsSuggestions = (data.symbols || []).map((sym: string) => ({
    id: sym,
    text: sym,
  }));
  const [newReelsetName, setNewReelsetName] = useState("");
  const [reelSets, setReelSets] = useState<Array<string>>(
    data && data[path]
      ? [
          ...presetReelSets(data),
          ...Object.keys(data[path]).filter(
            (k: string) => !presetReelSets(data).includes(k)
          ),
        ]
      : [...presetReelSets(data)]
  );
  const [activeKey, setActiveKey] = useState("");

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
        okText: "Confirm And save",
        cancelText: "Cancel",
        onOk() {
          const updatedReelSets = reelSets.filter((rs) => rs !== targetKey);
          const patch = { [path]: { ...data[path], [targetKey]: undefined } };
          handlePatch(patch);
          setReelSets(updatedReelSets);
          if (updatedReelSets.length > 0) {
            setActiveKey(updatedReelSets[0]);
          } else {
            setActiveKey("");
          }
        },
      });
    }
  };
  const handleOnSave = (reelset: string, formData: any) => {
    const patch = { [path]: { ...data[path], [reelset]: formData } };
    handlePatch(patch);
  };
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Input
          value={newReelsetName}
          onChange={(e: any) => {
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
            <ReelSet
              reelset={pane}
              symbolsSuggestions={symbolsSuggestions}
              values={
                data && data[path] && data[path][pane] ? data[path][pane] : {}
              }
              handleOnSave={(values: any) => handleOnSave(pane, values)}
              numberOfReels={data.numberOfReels}
            />
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};
export default ReelsetsForm;
