import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Container, Menu, MenuLabel, MenuLink, MenuList, Navbar,
  NavbarBrand, NavbarItem } from 'bloomer';
import { Adapters } from './Adapters';
import YetibotLogo from '-!svg-react-loader?name=yetibotLogo!../img/yetibot_lambda_blue_with_grey.svg';

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
                    <li><MenuLink>Dashboard</MenuLink></li>
                    <li><MenuLink>History</MenuLink></li>
                    <li><MenuLink>Adapters</MenuLink></li>
                    <li><MenuLink>Users</MenuLink></li>
                    <li><MenuLink>REPL</MenuLink></li>
                  </MenuList>

                  <MenuLabel>Administration</MenuLabel>
                  <MenuList>
                    <li><MenuLink>Configuration</MenuLink></li>
                    <li><MenuLink>Permissions</MenuLink></li>
                  </MenuList>

                  <MenuLabel>Links</MenuLabel>
                  <MenuList>
                      <li><MenuLink>GitHub</MenuLink></li>
                      <li><MenuLink>Blog</MenuLink></li>
                      <li><MenuLink>Docs</MenuLink></li>
                  </MenuList>
                </Menu>

              </div>

              <div className='column is-9'>
                <Adapters />
              </div>

            </div>

          </Container>
        </div>
      </ApolloProvider>
    );
  }
}
