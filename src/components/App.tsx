import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import {
  Container,
  Menu,
  MenuLabel,
  MenuLink,
  MenuList,
  Navbar,
  NavbarBrand,
  NavbarItem } from 'bloomer';
import { Adapters } from './Adapters';
import { History } from './History';
import { Dashboard } from './Dashboard';
import YetibotLogo from '-!svg-react-loader?name=yetibotLogo!../img/yetibot_lambda_blue_with_grey.svg';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'

// import 'bulma/css/bulma.css';
// import bulma from '~bulma/bulma.sass';
import 'bulma/bulma.sass';

const client = new ApolloClient({
  uri: 'http://localhost:3003/graphql'
});

interface Props {
  name: string;
}

export class App extends Component<Props> {
  render () {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div>

            <Navbar>
              <NavbarBrand>
                <YetibotLogo style={{marginLeft: 60, width: 200, height: 90}} />
              </NavbarBrand>
            </Navbar>

            <Container className='is-fluid'>
              <div className='columns'>
                <div className='column is-3'>
                  <Menu>
                    <MenuLabel>Yetibot</MenuLabel>
                    <MenuList>
                      <li><Link to="/">Dashboard</Link></li>
                      <li><Link to="/history">History</Link></li>
                      <li><Link to="/adapters">Adapters</Link></li>
                      <li><Link to="/users">Users</Link></li>
                      <li><Link to="/repl">REPL</Link></li>
                    </MenuList>

                    <MenuLabel>Administration</MenuLabel>
                    <MenuList>
                      <li><Link to="history">Configuration</Link></li>
                      <li><Link to="history">Permissions</Link></li>
                    </MenuList>

                    <MenuLabel>Links</MenuLabel>
                    <MenuList>
                      <li><Link to="history">GitHub</Link></li>
                      <li><Link to="history">Blog</Link></li>
                      <li><Link to="history">Docs</Link></li>
                    </MenuList>
                  </Menu>

                </div>

                <div className='column is-9'>
                  <Route path='/' exact={true} component={Dashboard} />
                  <Route path='/adapters' component={Adapters} />
                  <Route path='/history' component={History} />
                </div>

              </div>

            </Container>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}
