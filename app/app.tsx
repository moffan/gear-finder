import React from "react";
import { HashRouter, Switch, Route, Link } from "react-router-dom";
import {
  Aside,
  Container,
  Content,
  FooterBar,
  SideBar,
  Header
} from "./components";
import { UserProvider, Settings } from "./user";
import { Home } from "./home";
import { Currency } from "./currency";

const App = () => (
  <HashRouter>
    <UserProvider>
      <Container>
        <Header />
        <SideBar>
          <Link to="/">Home</Link>
          <Link to="/currency">Currency</Link>
          <Link to="/settings">Settings</Link>
        </SideBar>
        <Content>
          <Switch>
            <Route path="/currency" component={Currency} />
            <Route path="/settings" component={Settings} />
            <Route path="/" component={Home} />
          </Switch>
        </Content>
        <Aside>Aside</Aside>
        <FooterBar />
      </Container>
    </UserProvider>
  </HashRouter>
);

export default App;
