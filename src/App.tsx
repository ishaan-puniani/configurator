import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Configurator from "./configurator/configurator";
import ConfigurationLoader from "./configurationLoader";

function App() {
  return (
    <div>
      <ConfigurationLoader></ConfigurationLoader>
      <Configurator></Configurator>
    </div>
  );
}

export default App;
