import { Tabs, notification } from "antd";
import { useEffect, useState } from "react";
import { create, getData, patch, SLOT_STORAGE_KEY } from "../storage";
import BasicInfoForm from "./basicInfo";
import BonusGameConfiguration from "./bonusGames";
import GameModeAndReelSetMapper from "./gameModeAndReelSetMapper";
import PaytableForm from "./paytable/PaytableForm";
import PaytableContent from "./paytableContent";
import PublishForm from "./publish";
import ReelsetsForm from "./reelsets";
import WinSituations from "./winSituations";

const openNotification = (message: string | undefined) => {
  notification.info({
    message: message || "Configuration Updated",
    placement: "bottomLeft",
  });
};

const { TabPane } = Tabs;

const Configurator = () => {
  const [data, setData] = useState<any>(getData(SLOT_STORAGE_KEY));
  const handleCreate = (formData: any) => {
    create(SLOT_STORAGE_KEY, formData);
    setData(getData(SLOT_STORAGE_KEY));
    openNotification("Configuration Created");
  };
  const handlePatch = (formData: any) => {
    patch(SLOT_STORAGE_KEY, formData);
    setData(getData(SLOT_STORAGE_KEY));
    openNotification("Configuration Updated");
  };
  return (
    <>
      <Tabs tabPosition={"top"}>
        <TabPane tab="Basic Info" key="basic">
          <BasicInfoForm
            data={data}
            handleCreate={handleCreate}
            handlePatch={handlePatch}
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
        <TabPane tab="BonusGame" key="bonusGame" disabled={!data}>
          <BonusGameConfiguration
            data={data}
            path="bonusGameConfiguration"
            handlePatch={handlePatch}
          ></BonusGameConfiguration>
        </TabPane>
        <TabPane tab="Paytable" key="paytable" disabled={!data}>
          <PaytableForm
            data={data}
            path="paytableObj"
            symbols={data ? data.symbols : []}
            handlePatch={handlePatch}
          ></PaytableForm>
        </TabPane>
        <TabPane tab="PaytableContent" key="paytableContent" disabled={!data}>
          <PaytableContent
            data={data}
            path="paytableContent"
            handlePatch={handlePatch}
          ></PaytableContent>
        </TabPane>
        <TabPane tab="Upload To Server" key="publish" disabled={!data}>
          <PublishForm data={data} handlePatch={handlePatch}></PublishForm>
        </TabPane>
      </Tabs>
    </>
  );
};

export default Configurator;
