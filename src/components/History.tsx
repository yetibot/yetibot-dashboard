import React, {Component} from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import {Hero, HeroBody, Title, Subtitle, Table, Field,
  // FieldLabel, Control, Input,
  Icon, Notification} from 'bloomer';
import * as moment from 'moment';
import {timezoneOffsetHours} from '../util/timezone';
import * as qs from 'query-string';
import {withRouter, RouteComponentProps} from 'react-router';
import {NavLink} from 'react-router-dom';
import _ from 'lodash';
// import Select from 'react-select';

const HISTORY = gql`

  query history($timezone_offset_hours: Int!, $yetibot_only: Boolean!, $commands_only: Boolean!, $search_query: String) {
    stats(timezone_offset_hours: $timezone_offset_hours) {
      history_count
    }

    history(limit: 30, offset: 0,
      commands_only: $commands_only,
      yetibot_only: $yetibot_only,
      search_query: $search_query
    ) {
      id
      chat_source_adapter
      chat_source_room
      command
      correlation_id
      created_at
      user_name
      is_command
      is_yetibot
      body
      user_id
      user_name
    }
  }
`;

// const customStyles = {
//   control: (base) => ({
//     ...base,
//     height: '24px',
//     'min-height': '24px'
//   })
// };

interface Props {
}

interface State {
  query: {
    // search
    s?: string,
    // command only
    co: string,
    yo: string
  };
}

class HistoryComponent extends Component<RouteComponentProps<Props>, State> {

  constructor(props) {
    super(props);
    const query = qs.parse(props.location.search);
    this.state = {query};
    console.log('HistoryComponent constructor');
  }

  hasFiltersSet = () => !(_.isEmpty(this.state.query));

  componentDidUpdate(prevProps) {
    const prevQuery = qs.parse(prevProps.location.search);
    const query = qs.parse(this.props.location.search);
    // If the query was updated, propogate the change to History
    if (!_.isEqual(prevQuery, query)) {
      this.setState({query});
    }
  }

  // store query state on state.query then serialize it and reflect it in
  // the browser location query string
  updateQueryState = (queryStateToMerge) => {
    const currentQuery = this.state.query;
    const newQuery = {...currentQuery, ...queryStateToMerge};
    this.props.history.push(`/history?${qs.stringify(newQuery)}`);
  }

  commandsOnlyChange = (e) => {
    const co = e.target.checked ? '1' : '0';
    this.updateQueryState({co});
  }

  yetibotOnlyChange = (e) => {
    const yo = e.target.checked ? '1' : '0';
    this.updateQueryState({yo});
  }

  isCommandsOnly = () => (this.state.query.co === '1');

  isYetibotOnly = () => (this.state.query.yo === '1');

  searchQuery = () => {
    const st = this.state.query.s;
    // explicity return undefined for null or empty strings
    return (st) ? st : undefined;
  }

  render() {
    return (
      <Query
        query={HISTORY}
        pollInterval={0}
        variables={{
          commands_only: this.isCommandsOnly(),
          yetibot_only: this.isYetibotOnly(),
          search_query: this.searchQuery(),
          timezone_offset_hours: timezoneOffsetHours
        }}
      >
        {({loading, error, data}) => {
          if (loading) return <Notification isColor='info'>Loading...</Notification>;
          if (error) return <Notification isColor='danger'>{error.message}</Notification>;
          return (
            <div>
              <Hero isBold={true} isColor='info' isSize='small'>
                <HeroBody>
                  <Title>History</Title>
                  <Subtitle>Total items {data.stats.history_count}</Subtitle>
                </HeroBody>
              </Hero>

              <div className='history-filters'>
                <Field isHorizontal={true}>
                  <Field isHorizontal={true} className='checkbox-field'>
                    <input
                      id='command-only'
                      className='is-small is-white has-background-color is-checkradio'
                      type='checkbox'
                      checked={this.isCommandsOnly()}
                      onChange={this.commandsOnlyChange}
                    />
                    <label htmlFor='command-only'>Commands only</label>
                  </Field>
                  <Field isHorizontal={true} className='checkbox-field'>
                    <input
                      id='yetibot-only'
                      className='is-small is-white has-background-color is-checkradio'
                      type='checkbox'
                      checked={this.isYetibotOnly()}
                      onChange={this.yetibotOnlyChange}
                    />
                    <label htmlFor='yetibot-only'>Yetibot only</label>
                  </Field>
                  <Field isHorizontal={true}>
                    {
                      // <FieldLabel isSize='small'>Channel</FieldLabel>
                      // <Select
                      // styles={customStyles}
                      // options={[{label: 'one one one'}, {label: 'two two two'}]} />
                     }
                  </Field>
                  <Field isHorizontal={true}>
                    {
                      // <FieldLabel isSize='small'>User</FieldLabel>
                      // <Control hasIcons='left'>
                      //   <Input className='is-info' isSize='small' />
                      //   <Icon isSize='small' isAlign='left'>
                      //     <span className='fa fa-user' aria-hidden='true'/>
                      //   </Icon>
                      // </Control>

                    }
                  </Field>
                  {this.hasFiltersSet()
                    ? (<NavLink className='button is-small is-light' to='/history'>
                         <Icon isSize='small' isAlign='left'>
                           <span className='fa fa-times-circle' aria-hidden='true'/>
                         </Icon>
                         <span>Reset</span>
                       </NavLink>)
                         : null}
                </Field>
              </div>

              <Table isStriped={true} className='is-fullwidth is-hoverable'>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Body</th>
                    <th>Channel</th>
                    <th>Created</th>
                    <th>Command?</th>
                    <th>Yetibot?</th>
                  </tr>
                </thead>
                <tbody>
                  {data.history.map(historyItem => {
                    const createdAtUTC = moment.utc(historyItem.created_at);
                    return (
                      <tr key={historyItem.id}>
                        <td title={`User ID ${historyItem.user_id}`}>{historyItem.user_name}</td>
                        <td title={historyItem.id}>{historyItem.body}</td>
                        <td title={`Adapter ${historyItem.chat_source_adapter}`}>{historyItem.chat_source_room}</td>
                        <td title={createdAtUTC.local().format()}>{createdAtUTC.fromNow()}</td>
                        <td>{(historyItem.is_command) ? '✅' : ''}</td>
                        <td>{(historyItem.is_yetibot) ? '✅' : ''}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          );
        }}
      </Query>
    );
  }

}

export const History = withRouter(HistoryComponent);
