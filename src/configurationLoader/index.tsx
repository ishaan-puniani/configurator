import { Button, Select } from "antd";
import { useState } from "react";
import { sampleConfigs } from "../samples";
import { create } from "../storage";

const ConfigurationLoader = () => {
  const [configId, setConfigId] = useState<string>("");
  const onLoadConfiguration = () => {
    console.log(configId);
    if (configId === "new") {
      // create empty empty object for for configurator
    }
    // @ts-ignore
    const sampleConfig = sampleConfigs[configId];
    if (sampleConfig) {
      //  create(sampleConfig);
    }
  };
  return (
    <>
      <div>Samples</div>
      <Select
        style={{ width: "100%" }}
        onChange={(val: string) => setConfigId(val)}
      >
        <Select.Option value={"new"}>New</Select.Option>
        <Select.OptGroup label="Samples">
          {Object.keys(sampleConfigs).map((sample: string) => (
            <Select.Option value={sample} disabled>
              {sample}
            </Select.Option>
          ))}
        </Select.OptGroup>
      </Select>
      <Button onClick={onLoadConfiguration}>Load</Button>
    </>
  );
};
export default ConfigurationLoader;
