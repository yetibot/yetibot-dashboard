import React, {Component} from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import {Hero, HeroBody, Title, Subtitle, Table, Checkbox} from 'bloomer';
import * as moment from 'moment';
import {timezoneOffsetHours} from '../util/timezone';
import * as qs from 'query-string';

const HISTORY = gql`

  query history($timezone_offset_hours: Int!, $commands_only: Boolean!, $search_query: String) {
    stats(timezone_offset_hours: $timezone_offset_hours) {
      history_count
    }

    history(limit: 30, offset: 0,
      commands_only: $commands_only,
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

interface Props {
}

interface State {
  query: {
    // search
    s?: string,
    // command only
    co: string
  };
}

export class History extends Component<Props, State> {

  constructor(props) {
    super(props);
    const query = qs.parse(props.location.search);
    this.state = {query};
  }

  updateQueryState = (queryStateToMerge) => {
    // TODO this is async and might not update history correctly
    this.setState(({query}) =>
      ({query: {...query, ...queryStateToMerge}}));
    history.pushState({}, '', `/history?${qs.stringify(this.state.query)}`);
  }

  commandsOnlyChange = (e) => {
    const co = e.target.checked ? '1' : '0';
    this.updateQueryState({co});
  }

  isCommandsOnly = () => (this.state.query.co === '1');

  searchQuery = () => {
    const st = this.state.query.s;
    // explicity return undefined for null or empty strings
    return (st) ? st : undefined;
  }

  render() {
    return (
      <Query
        query={HISTORY}
        variables={{
          commands_only: this.isCommandsOnly(),
          search_query: this.searchQuery(),
          timezone_offset_hours: timezoneOffsetHours
        }}
      >
        {({loading, error, data}) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error {error}</p>;

          return (
            <div>
              <Hero isBold={true} isColor='info' isSize='small'>
                <HeroBody>
                  <Title>History</Title>
                  <Subtitle>Total items {data.stats.history_count}</Subtitle>
                  <div>
                    <Checkbox
                      id='commandsOnly'
                      checked={this.isCommandsOnly()}
                      onChange={this.commandsOnlyChange}
                    >
                      Commands only
                    </Checkbox>
                  </div>
                </HeroBody>
              </Hero>

              <Table isStriped={true} className='is-fullwidth is-hoverable'>
                <thead>
                  <tr>
                    <th>ID</th>
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
                        <td>{historyItem.id}</td>
                        <td title={`User ID ${historyItem.user_id}`}>{historyItem.user_name}</td>
                        <td>{historyItem.body}</td>
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
