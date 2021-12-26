import { Tabs } from "antd";
import { useEffect, useState } from "react";
import { create, getData, patch } from "../storage";
import BasicInfoForm from "./basicInfo";
import GameModeAndReelSetMapper from "./gameModeAndReelSetMapper";
import PaytableForm from "./paytable/PaytableForm";
import ReelsetsForm from "./reelsets";
import WinSituations from "./winSituations";

const { TabPane } = Tabs;

const Configurator = () => {
  const [data, setData] = useState<any>(getData());
  const handleCreate = (formData: any) => {
    create(formData);
    setData(getData());
  };
  const handlePatch = (formData: any) => {
    patch(formData);
    setData(getData());
  };
  return (
    <>
      <Tabs tabPosition={"top"}>
        <TabPane tab="Basic Info" key="basic">
          <BasicInfoForm
            data={data}
            handleCreate={handleCreate}
          ></BasicInfoForm>
        </TabPane>
        <TabPane tab="Reel Sets" key="reelsets" disabled={!data}>
          <ReelsetsForm
            data={data}
            path={"availableReelsets"}
            handlePatch={handlePatch}
          ></ReelsetsForm>
        </TabPane>
        <TabPane
          tab="Game Mode and ReelSet Mapping"
          key="gamemodes"
          disabled={!data}
        >
          <GameModeAndReelSetMapper
            data={data}
            path="reelsetMapping"
            handlePatch={handlePatch}
          ></GameModeAndReelSetMapper>
        </TabPane>
        <TabPane tab="Win Situations" key="winsituations" disabled={!data}>
          <WinSituations
            data={data}
            path={"betLines"}
            numberOfBetLines={data ? data.numberOfBetLines : 0}
            handlePatch={handlePatch}
          ></WinSituations>
        </TabPane>
        <TabPane tab="Special" key="special" disabled={!data}>
          Pick and drop configuration will go here
        </TabPane>
        <TabPane tab="Paytable" key="paytable" disabled={!data}>
          <PaytableForm
            data={data}
            path="paytableObj"
            symbols={data ? data.symbols : []}
            handlePatch={handlePatch}
          ></PaytableForm>
        </TabPane>
        <TabPane tab="Upload To Server" key="publish" disabled={!data}>
          Content for publish
        </TabPane>
      </Tabs>
    </>
  );
};

export default Configurator;
