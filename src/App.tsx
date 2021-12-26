import React from "react";
import logo from "./logo.svg";
import "./App.css";
import BasicInfoForm from "./configurator/basicInfo";
import ReelsetsForm from "./configurator/reelsets";
import ReelSet from "./configurator/reelsets/ReelSet";
import WinSituations from "./configurator/winSituations";
import Paytable from "./configurator/paytable";
import PaytableForm from "./configurator/paytable/PaytableForm";

function App() {
  return (
    <div>
      <PaytableForm></PaytableForm>
    </div>
  );
}

export default App;
