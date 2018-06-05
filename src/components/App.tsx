import React, {Component} from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import fontawesome from '@fortawesome/fontawesome';
import {YetibotContext} from '../yetibot-context.js';

import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';
fontawesome.library.add(faSearch);

import '../style/overrides.scss';

import {
  Container,
  Control,
  Field,
  Icon,
  Input,
  Menu,
  MenuLabel,
  MenuList,
  Navbar,
  NavbarBrand,
  NavbarItem ,
  NavbarStart,
  NavbarEnd
} from 'bloomer';
import {Adapters} from './Adapters';
import {Repl} from './Repl';
import {History} from './History';
import {Users} from './Users';
import {Aliases} from './Aliases';
import {Observers} from './Observers';
import {Crons} from './Crons';
import {Dashboard} from './Dashboard';
import YetibotLogo from '-!svg-react-loader?name=yetibotLogo!../img/yetibot_lambda_blue_with_grey.svg';

import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom';

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
}

export class App extends Component<Props, AppState> {

  constructor(props) {
    super(props);
    NavLink.defaultProps = {...NavLink.defaultProps, activeClassName: 'is-active'};
    this.state = {};
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <YetibotContext.Provider value={this.state}>
          <Router>
            <div>

              <Navbar className='is-white is-fixed-top'>
                <Container>
                  <NavbarStart>
                    <NavbarBrand>
                      <NavbarItem>
                        <NavLink activeClassName='is-active' to='/'>
                          <YetibotLogo style={{width: 120, height: 28}} />
                        </NavLink>
                      </NavbarItem>
                    </NavbarBrand>
                  </NavbarStart>
                  <NavbarEnd>
                    <NavbarItem>
                      <Field>
                        <Control isExpanded={true} hasIcons='left'>
                          <Input placeholder='Search History' isColor='light' />
                          <Icon isSize='small' isAlign='left'><span className='fa fa-search' aria-hidden='true'/></Icon>
                      </Control>
                      </Field>
                    </NavbarItem>
                  </NavbarEnd>
                </Container>
              </Navbar>

              <Container id='content-body'>
                <div className='columns'>
                  <div className='column is-2'>
                    <Menu>
                      <MenuLabel>Yetibot</MenuLabel>
                      <MenuList>
                        <li><NavLink exact={true} to='/'>Dashboard</NavLink></li>
                        <li><NavLink to='/history'>History</NavLink></li>
                        <li><NavLink to='/users'>Users</NavLink></li>
                        <li><NavLink to='/adapters'>Adapters</NavLink></li>
                        <li><NavLink to='/aliases'>Aliases</NavLink></li>
                        <li><NavLink to='/observers'>Observers</NavLink></li>
                        <li><NavLink to='/cron'>Cron tasks</NavLink></li>
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
                    <Route path='/' exact={true} component={Dashboard} />
                    <Route path='/adapters' component={Adapters} />
                    <Route path='/history' component={History} />
                    <Route path='/users' component={Users} />
                    <Route path='/aliases' component={Aliases} />
                    <Route path='/observers' component={Observers} />
                    <Route path='/cron' component={Crons} />
                    <Route path='/repl' component={Repl} />
                  </div>

                </div>

              </Container>
            </div>
          </Router>
        </YetibotContext.Provider>
      </ApolloProvider>
    );
  }
}
