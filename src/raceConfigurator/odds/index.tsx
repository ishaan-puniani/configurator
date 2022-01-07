import { Tabs } from "antd";
import ForecastOddsForm from "./forecast";
import PositionalOddsForm from "./positional";

const { TabPane } = Tabs;
export const Odds = ({ data, handlePatch }: any) => {
  return (
    <>
      <div>
        <Tabs tabPosition={"top"}>
          <TabPane tab="Positiona" key="positional">
            <PositionalOddsForm
              data={data || {}}
              path="categories"
              symbols={data ? data.symbols : []}
              handlePatch={handlePatch}
            />
          </TabPane>
          <TabPane tab="Forecast" key="forecast">
            <ForecastOddsForm
              data={data || {}}
              path="runners"
              runners={data ? data.runners : []}
              handlePatch={handlePatch}
            />
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};
