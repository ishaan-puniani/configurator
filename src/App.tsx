import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Configurator from "./configurator/configurator";
import ConfigurationLoader from "./configurationLoader";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Lobby from "./lobby";

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/lobby">Lobby</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <ConfigurationLoader></ConfigurationLoader>
                <Configurator></Configurator>
              </div>
            }
          ></Route>
          <Route path="/lobby" element={<Lobby></Lobby>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
