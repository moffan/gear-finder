import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import {
  Aside,
  Container,
  Content,
  FooterBar,
  SideBar,
  Header,
  HomeLink
} from "./components";
import { UserProvider } from "./user";
import { CurrencyRoute, CurrencyLink } from "./currency";

const App = () => (
  <UserProvider>
    <HashRouter>
      <Container>
        <Header />
        <SideBar>
          <HomeLink />
          <CurrencyLink />
        </SideBar>
        <Content>
          <Switch>
            <CurrencyRoute />
            <Route exact path="/about">
              <div>about</div>
            </Route>
          </Switch>
        </Content>
        <Aside>Aside</Aside>
        <FooterBar />
      </Container>
    </HashRouter>
  </UserProvider>
);

export default App;
