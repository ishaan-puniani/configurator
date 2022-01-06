import { Button, Collapse, Space } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
const { Panel } = Collapse;

export const GameStats = ({ configId, operatorId }: any) => {
  const [gameFeaturesUsage, setGameFeaturesUsage] = useState<any>(undefined);
  //   useEffect(() => {
  //     const fetchStats = async () => {
  //       const statsUrl = `https://wallet-and-bonus-47kby.ondigitalocean.app/api/tenant/923d95cb-3be0-41a4-997b-a41d2d657467/gameolive/get-game-feature-hit-ratio?filter[productId]=${configId}`;
  //       const stats = await axios.get(statsUrl);
  //       const gameStats = stats.data;
  //       if (gameStats && gameStats.rows && gameStats.rows.length === 1) {
  //         setGameFeaturesUsage(gameStats.rows[0]);
  //       }
  //     };
  //     fetchStats();
  //   }, [configId]);
  const loadStats = async () => {
    const statsUrl = `https://wallet-and-bonus-47kby.ondigitalocean.app/api/tenant/923d95cb-3be0-41a4-997b-a41d2d657467/gameolive/get-game-feature-hit-ratio?filter[productId]=${configId}`;
    const stats = await axios.get(statsUrl);
    const gameStats = stats.data;
    if (gameStats && gameStats.rows && gameStats.rows.length === 1) {
      setGameFeaturesUsage(gameStats.rows[0]);
    }
  };
  return (
    <div>
      {!gameFeaturesUsage && (
        <Button onClick={loadStats} type="link">
          Show Stats
        </Button>
      )}
      <table>
        {gameFeaturesUsage &&
          Object.keys(gameFeaturesUsage).map((stat) => (
            <tr>
              <td>{stat}:</td>
              <td>{gameFeaturesUsage[stat]}</td>
            </tr>
          ))}
      </table>
    </div>
  );
};
