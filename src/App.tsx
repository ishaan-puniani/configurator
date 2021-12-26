import React from "react";
import logo from "./logo.svg";
import "./App.css";
import BasicInfoForm from "./configurator/basicInfo";
import ReelsetsForm from "./configurator/reelsets";
import ReelSet from "./configurator/reelsets/ReelSet";

function App() {
  return (
    <div>
      <ReelsetsForm></ReelsetsForm>
    </div>
  );
}

export default App;
