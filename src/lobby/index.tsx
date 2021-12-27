import { EditOutlined } from "@ant-design/icons";
import { Avatar, Button, List, Progress, Space } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { create } from "../storage";
import { useNavigate } from "react-router-dom";
import Loader from "../utils/Loader";

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

const Lobby = () => {
  const navigate = useNavigate();
  const [games, setGames] = useState<Array<any>>();
  const [loaderVisibility, setLoaderVisibility] = useState<boolean>(true);
  const [visibleGamePanel, setVisibleGamePanel] = useState<boolean>(false);

  const playGameInIframe = (configurationId: any) => {
    const iFrameLaunchConfig = {
      operatorId: initConfig.operatorId,
      configId: configurationId,
      server: initConfig.server,
      playerId: "test1234",
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
      playerId: "test1234",
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
      create(resp.data.configuration);
      navigate("/configurator", { replace: true });
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
                    configurationId: <b>${item.configurationId}</b>{" "}
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
    </>
  );
};
export default Lobby;
