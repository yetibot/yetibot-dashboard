import React, {Component} from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import fontawesome from '@fortawesome/fontawesome';
import {YetibotContext} from '../yetibot-context.js';

import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';
import faUser from '@fortawesome/fontawesome-free-solid/faUser';
import faTimesCircle from '@fortawesome/fontawesome-free-solid/faTimesCircle';
import faHashtag from '@fortawesome/fontawesome-free-solid/faHashtag';
import faExternal from '@fortawesome/fontawesome-free-solid/faExternalLinkAlt';

import '../style/overrides.scss';

import {
  Container,
  Field,
  Icon,
  Menu,
  MenuLabel,
  MenuList,
  Navbar,
  NavbarBrand,
  NavbarItem,
  NavbarStart,
  NavbarEnd
} from 'bloomer';
import {Adapters} from './Adapters';
import {Repl} from './Repl';
import {History} from './History';
import {Users} from './Users';
import {User} from './User';
import {Aliases} from './Aliases';
import {Search} from './Search';
import {Observers} from './Observers';
import {Crons} from './Crons';
import {Dashboard} from './Dashboard';
// import YetibotLogo from '-!svg-react-loader?name=yetibotLogo!../img/yetibot_lambda_blue_with_grey.svg';
import logo from '../img/yetibot_lambda_blue_with_grey.svg';

import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom';

fontawesome.library.add(faExternal, faSearch, faUser, faTimesCircle, faHashtag);

declare global {
  interface Window {
    Yetibot: {url: string};
  }
}

const YETIBOT_URL = (window && window.Yetibot && window.Yetibot.url) ||
  'http://localhost:3003';

const GRAPHQL_ENDPOINT = `${YETIBOT_URL}/graphql`;

const client = new ApolloClient({uri: GRAPHQL_ENDPOINT});

interface Props {
  name: string;
}

interface AppState {
}

export class App extends Component<Props, AppState> {

  constructor(props: any) {
    super(props);
    // TODO set active class name globally
    (NavLink as any).defaultProps = {...(NavLink as any).defaultProps, activeClassName: 'is-active'};
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
                        <NavLink to='/'>
                          <img
                            style={{width: 120, height: 28}}
                            src={logo}
                            className="yetibot-lgo"
                            alt="Yetibot"
                          />
                        </NavLink>
                      </NavbarItem>
                    </NavbarBrand>
                  </NavbarStart>
                  <NavbarEnd>
                    <NavbarItem>
                      <Field>
                        <Search />
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
                        <li>
                          <a href='https://yetibot.com'>
                            <Icon isSize='small' isAlign='left' className='fa fa-external-link-alt' />
                            Yetibot.com
                          </a>
                        </li>
                        <li>
                          <a href='https://github.com/yetibot/yetibot'>
                            <Icon isSize='small' isAlign='left' className='fa fa-external-link-alt' />
                            GitHub
                        </a>
                        </li>
                        <li>
                          <a href='https://yetibot.com/archives'>
                            <Icon isSize='small' isAlign='left' className='fa fa-external-link-alt' />
                            Blog
                          </a>
                        </li>
                        <li>
                          <a href='https://yetibot.com/user-guide'>
                            <Icon isSize='small' isAlign='left' className='fa fa-external-link-alt' />
                            Docs
                        </a>
                      </li>
                      </MenuList>
                    </Menu>

                  </div>

                  <div id='content-container' className='column is-10'>
                    <Route path='/' exact={true} component={Dashboard} />
                    <Route path='/adapters' component={Adapters} />
                    <Route path='/history' component={History} />
                    <Route path='/users' exact={true} component={Users} />
                    <Route path='/user/:id' component={User} />
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
