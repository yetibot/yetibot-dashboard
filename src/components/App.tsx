import React, {Component} from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

import '../style/overrides.scss';
import {
  Container,
  Menu,
  MenuLabel,
  MenuList,
  Navbar,
  NavbarBrand,
  NavbarItem } from 'bloomer';
import {Adapters} from './Adapters';
import {Repl} from './Repl';
import {History} from './History';
import {Dashboard} from './Dashboard';
import YetibotLogo from '-!svg-react-loader?name=yetibotLogo!../img/yetibot_lambda_blue_with_grey.svg';

import {
  BrowserRouter as Router,
  Route,
  NavLink
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

interface AppState {
  timezoneOffsetHours: number;
}

export class App extends Component<Props, AppState> {

  constructor(props) {
    super(props);
    NavLink.defaultProps = {...NavLink.defaultProps, activeClassName: 'is-active'};
    this.state = {timezoneOffsetHours: new Date().getTimezoneOffset() / 60};
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div>

            <Navbar className='is-white is-fixed-top'>
              <Container>
                <NavbarBrand>
                  <NavbarItem>
                    <NavLink activeClassName='is-active' to='/'>
                      <YetibotLogo style={{width: 120, height: 28}} />
                    </NavLink>
                  </NavbarItem>
                </NavbarBrand>
              </Container>
            </Navbar>

            <Container className=''>
              <div className='columns'>
                <div className='column is-2'>
                  &nbsp;
                </div>
                <div className='column is-2' style={{position: 'fixed'}}>
                  <Menu>
                    <MenuLabel>Yetibot</MenuLabel>
                    <MenuList>
                      <li><NavLink exact={true} to='/'>Dashboard</NavLink></li>
                      <li><NavLink to='/history'>History</NavLink></li>
                      <li><NavLink to='/users'>Users</NavLink></li>
                      <li><NavLink to='/adapters'>Adapters</NavLink></li>
                      <li><NavLink to='/repl'>REPL</NavLink></li>
                    </MenuList>

                    {/* <MenuLabel>Administration</MenuLabel> */}
                    {/* <MenuList> */}
                    {/*   <li><Link to='history'>Configuration</Link></li> */}
                    {/*   <li><Link to='history'>Permissions</Link></li> */}
                    {/* </MenuList> */}

                    <MenuLabel>Links</MenuLabel>
                    <MenuList>
                      <li><a href='https://yetibot.com'>Yetibot Home</a></li>
                      <li><a href='https://github.com/yetibot/yetibot'>GitHub</a></li>
                      <li><a href='https://yetibot.com/archives/'>Blog</a></li>
                      <li><a href='https://yetibot.com/user-guide/'>Docs</a></li>
                    </MenuList>
                  </Menu>

                </div>

                <div id='content-container' className='column is-10'>
                  <Route
                    path='/'
                    exact={true}
                    render={() =>
                      <Dashboard timezoneOffsetHours={this.state.timezoneOffsetHours} />
                    } />
                  <Route path='/adapters' component={Adapters} />
                  <Route path='/history' render={() =>
                    <History timezoneOffsetHours={this.state.timezoneOffsetHours} />
                  } />
                  <Route path='/repl' component={Repl} />
                </div>

              </div>

            </Container>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}
