import React from "react";
import logo from "./logo.svg";
import "./App.css";
import BasicInfoForm from "./configurator/basicInfo";
import ReelsetsForm from "./configurator/reelsets";
import ReelSet from "./configurator/reelsets/ReelSet";
import WinSituations from "./configurator/winSituations";
import PaytableForm from "./configurator/paytable/PaytableForm";
import Configurator from "./configurator/configurator";

function App() {
  return (
    <div>
      <Configurator></Configurator>
    </div>
  );
}

export default App;
