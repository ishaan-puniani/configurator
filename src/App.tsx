import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Configurator from "./configurator/configurator";
import ConfigurationLoader from "./configurationLoader";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Lobby from "./lobby";
import { Layout, Menu, Breadcrumb } from "antd";

const { Header, Content, Footer } = Layout;

function App() {
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
              <Link to="/lobby">Lobby</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px", background: "#fff" }}>
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
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Router>
  );
}

export default App;
