import { Tabs } from "antd";
import BasicInfoForm from "./basicInfo";

const { TabPane } = Tabs;

const Configurator = () => {
  return (
    <>
      <Tabs tabPosition={"top"}>
        <TabPane tab="Tab 1" key="1">
          <BasicInfoForm></BasicInfoForm>
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab 3
        </TabPane>
      </Tabs>
    </>
  );
};

export default Configurator;
