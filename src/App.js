import React from "react";
import { Layout, Typography } from "antd";
import Info from "./info";

function App() {
  const { Header, Footer, Content } = Layout;

  return (
    <Layout style={{ height: "100vh" }}>
      <Header style={{ display: "flex", justifyContent: "center" }}>
        <Typography.Title style={{ color: "white" }}>NASA API</Typography.Title>
      </Header>
      <Content style={{ width: "1440px", margin: "0 auto" }}>
        <Info />
      </Content>
      <Footer style={{ display: "flex", justifyContent: "center" }}>
        <Typography.Text>Developer: Artur Gunka 2020</Typography.Text>
      </Footer>
    </Layout>
  );
}

export default App;
