import React, { FunctionComponent } from "react";
import { HashRouter, Link, Route, Switch } from "react-router-dom";

import { CharacterRouter } from "./characters";
import {
  // Aside,
  Container,
  Content,
  FooterBar,
  Header,
  SideBar
} from "./components";
import { Currency } from "./currency";
import { Home } from "./home";
import { Search } from "./search";
import { Settings, UserProvider } from "./user";

const App: FunctionComponent = () => (
  <HashRouter>
    <UserProvider>
      <Container>
        <Header />
        <SideBar>
          <Link to="/">Home</Link>
          <Link to="/characters">Characters</Link>
          <Link to="/currency">Currency</Link>
          <Link to="/search">Search</Link>
          <Link to="/settings">Settings</Link>
        </SideBar>
        <Content>
          <Switch>
            <Route path="/search" component={Search} />
            <Route path="/characters" component={CharacterRouter} />
            <Route path="/currency" component={Currency} />
            <Route path="/settings" component={Settings} />
            <Route path="/" component={Home} />
          </Switch>
        </Content>
        {/* <Aside>Aside</Aside> */}
        <FooterBar />
      </Container>
    </UserProvider>
  </HashRouter>
);

export default App;
