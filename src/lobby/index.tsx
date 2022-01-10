import { EditOutlined } from "@ant-design/icons";
import {
  Alert,
  Avatar,
  BackTop,
  Button,
  Input,
  List,
  Progress,
  Space,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { create, RACE_STORAGE_KEY, SLOT_STORAGE_KEY } from "../storage";
import { useNavigate } from "react-router-dom";
import Loader from "../utils/Loader";
import { GameStats } from "./gameStats";

declare global {
  interface Window {
    gameolive: any;
  }
}
const { init, getGames, registerPlayer, getPlayerToken, launchGame } =
  window.gameolive;

const initConfig = {
  server: "https://ml-search-mhwiw.ondigitalocean.app",
  clientId:
    "SA_Game-815dae14-55ba-446e-bcf0-b97b1fec056e@e74c6b04-0558-417c-9a8f-c08b5a42b9a6.gol",
  clientSecret: "abc1602832965454",
  operatorId: "5f8ae3cbc34272000af1f3bf",
};
const tempUser = `testuser${Date.now()}`;
const Lobby = () => {
  const storedPID = window.localStorage.getItem("playerId");
  const navigate = useNavigate();
  const [playerId, setPlayerId] = useState<string | null>(storedPID);
  const [txtPlayerId, setTxtPlayerId] = useState<string>(tempUser);
  const [games, setGames] = useState<Array<any>>();
  const [loaderVisibility, setLoaderVisibility] = useState<boolean>(true);
  const [visibleGamePanel, setVisibleGamePanel] = useState<boolean>(false);

  const playGameInIframe = (configurationId: any) => {
    const iFrameLaunchConfig = {
      operatorId: initConfig.operatorId,
      configId: configurationId,
      server: initConfig.server,
      playerId: playerId,
      launchType: "iframe",
      gameContainerId: "gamecontainer",
    };
    launchGame(iFrameLaunchConfig, (_iframeRef: any, error: any) => {
      if (!error) {
        setVisibleGamePanel(true);
      } else {
        setVisibleGamePanel(false);
      }
    });
  };
  const playGameInPopup = (configurationId: string) => {
    const popupLaunchConfig = {
      operatorId: initConfig.operatorId,
      configId: configurationId,
      server: initConfig.server,
      playerId: playerId,
      launchType: "popup",
      name: "",
      specs: "width=960,height=540",
      replace: "",
    };
    launchGame(popupLaunchConfig);
  };
  const onEditConfiguration = async (configurationId: string) => {
    setLoaderVisibility(true);
    var config = {
      method: "get",
      url: `${initConfig.server}/api/get-config/${initConfig.operatorId}/${configurationId}`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    //@ts-ignore
    const resp = await axios(config);
    if (resp.data && resp.data.configuration) {
      if (resp.data.configuration.gameid === "race-server-base") {
        create(RACE_STORAGE_KEY, resp.data.configuration);
        navigate("/race-configurator");
      }
      if (resp.data.configuration.gameid === "slot-linked-server") {
        create(SLOT_STORAGE_KEY, resp.data.configuration);
        navigate("/configurator");
      }
    } else {
      alert("Some error occured");
    }
  };
  useEffect(() => {
    const fetchGames = async () => {
      init(initConfig, (_token: string, authError: any) => {
        if (!authError) {
          getGames(
            { application: "website" },
            (games: Array<any>, gamesError: any) => {
              if (!gamesError) {
                setGames(games);
              } else {
                console.error(gamesError);
              }
            }
          );
        } else {
          console.log(authError);
        }
      });
    };

    fetchGames();
  }, []);

  return (
    <>
      {storedPID && (
        <Alert
          message={`You are playing as: ${playerId}`}
          type="info"
          action={
            <Button
              size="small"
              onClick={() => {
                window.localStorage.removeItem("playerId");
                setPlayerId(null);
              }}
            >
              Logout
            </Button>
          }
        ></Alert>
      )}
      {!storedPID && (
        <div
          style={{
            textAlign: "right",
            background: "#e6f7ff",
          }}
        >
          <Space align="end" style={{ margin: "10px" }}>
            <Input
              onChange={(e: any) => {
                console.log(e.target.value);
                setTxtPlayerId(e.target.value);
              }}
            />

            <Button
              onClick={() => {
                if (txtPlayerId.length > 4) {
                  window.localStorage.setItem("playerId", txtPlayerId);
                  setPlayerId(txtPlayerId);
                } else {
                  alert("Length of player id should be more than 5");
                }
              }}
            >
              Login as user
            </Button>
          </Space>
        </div>
      )}
      <div style={{ textAlign: "center" }}>
        <div
          id="gamecontainer"
          style={{
            width: "960px",
            height: "540px",
            display: visibleGamePanel ? "" : "none",
            margin: "auto",
          }}
        ></div>
      </div>
      {games && !loaderVisibility ? (
        <List
          itemLayout="horizontal"
          dataSource={games}
          renderItem={(item: any) => (
            <List.Item
              actions={[
                <Button onClick={() => playGameInIframe(item.configurationId)}>
                  Play
                </Button>,
                // <Button onClick={() => playGameInIframe(item.configurationId)}>
                //   Play
                // </Button>,
                <Button onClick={() => playGameInPopup(item.configurationId)}>
                  Open Popup
                </Button>,
              ]}
            >
              <List.Item.Meta
                // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={
                  <a href="https://ant.design">{item.configuration.name}</a>
                }
                description={
                  <div>
                    configurationId: <b>{item.configurationId}</b>{" "}
                    <Button
                      type="primary"
                      size="small"
                      icon={<EditOutlined />}
                      onClick={() => onEditConfiguration(item.configurationId)}
                    >
                      Edit
                    </Button>
                  </div>
                }
              />
              <GameStats configId={item.configurationId}></GameStats>
            </List.Item>
          )}
        />
      ) : (
        <Loader
          onDone={() => {
            setLoaderVisibility(false);
          }}
        ></Loader>
      )}
      <BackTop></BackTop>
    </>
  );
};
export default Lobby;
