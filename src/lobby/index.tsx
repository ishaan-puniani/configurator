import { Avatar, Button, List } from "antd";
import { useEffect, useState } from "react";

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
  const [games, setGames] = useState<Array<any>>([]);

  const playGameInIframe = (configurationId: any) => {
    const iFrameLaunchConfig = {
      operatorId: initConfig.operatorId,
      configId: configurationId,
      server: initConfig.server,
      playerId: "test1234",
      launchType: "iframe",
      gameContainerId: "gamecontainer",
    };
    launchGame(iFrameLaunchConfig);
  };
  const playGameInPopup = (configurationId: any) => {
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
      <div id="gamecontainer" style={{ width: "960px", height: "540px" }}></div>
      {games && (
        <List
          itemLayout="horizontal"
          dataSource={games}
          renderItem={(item: any) => (
            <List.Item
              actions={[
                <Button onClick={() => playGameInIframe(item.configurationId)}>
                  Play
                </Button>,
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
                description={`configurationId: ${item.configurationId}`}
              />
            </List.Item>
          )}
        />
      )}
    </>
  );
};
export default Lobby;
