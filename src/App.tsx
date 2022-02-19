import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Configurator from "./configurator/configurator";
import ConfigurationLoader from "./configurationLoader";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Lobby from "./lobby";
import { Layout, Menu, Breadcrumb } from "antd";
import Home from "./home";
import { RaceConfigurator } from "./raceConfigurator";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const { Header, Content, Footer } = Layout;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jwt, setJWT] = useState<string>();
  useEffect(() => {
    const fetchMe = async (token: string) => {
      const user = await axios.get(
        "https://elantra-api.gameolive.com/api/auth/me",
        { headers: { authorization: `Bearer ${token}` } }
      );
      if (user) {
        setIsLoggedIn(true);
      }
    };

    const jwtLs = localStorage.getItem("jwt"); // useLocaltorage state
    if (jwtLs && jwtLs.length > 0) fetchMe(jwtLs);
  }, [jwt]);

  if (isLoggedIn)
    return (
      <Router>
        <Layout className="layout">
          <Header>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
              <Menu.Item>
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/configurator">Configurator</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/race-configurator">Race Configurator</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/lobby">Lobby</Link>
              </Menu.Item>
            </Menu>
          </Header>
          <Content
            style={{
              padding: "0 50px",
              background: "#fff",
              minHeight: "500px",
            }}
          >
            <Routes>
              <Route
                path="/configurator"
                element={
                  <div>
                    <ConfigurationLoader></ConfigurationLoader>
                    <Configurator></Configurator>
                  </div>
                }
              ></Route>
              <Route
                path="/race-configurator"
                element={<RaceConfigurator />}
              ></Route>
              <Route path="/lobby" element={<Lobby></Lobby>}></Route>
              <Route
                path="/"
                element={
                  <Home
                    onLoginSuccess={(tkn: string) => {
                      setJWT(tkn);
                    }}
                    isLoggedIn={isLoggedIn}
                  ></Home>
                }
              ></Route>
            </Routes>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            All Rights Reserved @ Lucky Beetle Games
          </Footer>
        </Layout>
      </Router>
    );
  return (
    <Home
      onLoginSuccess={(tkn: string) => {
        setJWT(tkn);
      }}
      isLoggedIn={isLoggedIn}
    ></Home>
  );
}

export default App;
