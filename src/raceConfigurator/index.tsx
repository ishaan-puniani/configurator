import { Tabs } from "antd";
import { useEffect, useState } from "react";
import { create, getData, patch, RACE_STORAGE_KEY } from "../storage";
import { BasicInfo } from "./basicInfo";
import ChipsSetForm from "./chipsSet";
import { Odds } from "./odds";
import ForecastOddsForm from "./odds/forecast";
import PositionalOddsForm from "./odds/positional";
import PublishForm from "./publish";
import RunnersInformationForm from "./runners";

const { TabPane } = Tabs;

export const RaceConfigurator = () => {
  const [data, setData] = useState<any>(getData(RACE_STORAGE_KEY));
  const handleCreate = (formData: any) => {
    create(RACE_STORAGE_KEY, { ...formData });
    setData(getData(RACE_STORAGE_KEY));
  };
  const handlePatch = (formData: any) => {
    patch(RACE_STORAGE_KEY, { ...formData });
    setData(getData(RACE_STORAGE_KEY));
  };
  return (
    <div>
      <Tabs tabPosition={"top"}>
        <TabPane tab="Basic Info" key="basic">
          <BasicInfo
            data={data}
            handleCreate={handleCreate}
            handlePatch={handlePatch}
          ></BasicInfo>
        </TabPane>
        <TabPane tab="Runners Info" key="runners" disabled={!data}>
          <RunnersInformationForm
            data={data}
            path={"runners"}
            handleCreate={handleCreate}
            handlePatch={handlePatch}
          ></RunnersInformationForm>
        </TabPane>
        <TabPane tab="Odds Builder" key="odds" disabled={!data}>
          <Odds
            data={data}
            path={"runners"}
            handleCreate={handleCreate}
            handlePatch={handlePatch}
          ></Odds>
        </TabPane>
        <TabPane tab="Chip Set" key="chipset" disabled={!data}>
          <ChipsSetForm
            data={data}
            path={"availableChips"}
            handlePatch={handlePatch}
          ></ChipsSetForm>
        </TabPane>
        <TabPane tab="Upload To Server" key="publish" disabled={!data}>
          <PublishForm data={data} handlePatch={handlePatch}></PublishForm>
        </TabPane>
      </Tabs>
    </div>
  );
};
