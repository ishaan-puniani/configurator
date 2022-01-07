import { Tabs } from "antd";
import ForecastOddsForm from "./forecast";
import PositionalOddsForm from "./positional";

const { TabPane } = Tabs;
export const Odds = ({ data, handlePatch }: any) => {
  const handlePositionalPatch = (positionalData: any) => {
    debugger;
    const odds = data.odds || {};
    odds.positional = positionalData;
    handlePatch({ odds });
  };
  const handleForecastPatch = (forecastData: any) => {
    const odds = data.odds || {};
    odds.forecast = forecastData;
    handlePatch({ odds });
  };
  return (
    <>
      <div>
        <Tabs tabPosition={"top"}>
          <TabPane tab="Positional" key="positional">
            <PositionalOddsForm
              data={data || {}}
              positionalData={data?.odds?.positional || {}}
              path="categories"
              handlePatch={handlePositionalPatch}
            />
          </TabPane>
          <TabPane tab="Forecast" key="forecast">
            <ForecastOddsForm
              data={data || {}}
              path="runners"
              forecastData={data?.odds?.forecast || {}}
              handlePatch={handleForecastPatch}
            />
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};
