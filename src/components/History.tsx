import React, {Component} from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import {Hero, HeroBody, Title, Subtitle, Table} from 'bloomer';
import * as moment from 'moment';
import {timezoneOffsetHours} from '../util/timezone';
import * as qs from 'query-string';

const HISTORY = gql`

  query hisotry($timezone_offset_hours: Int!, $commands_only: Boolean!) {
    stats(timezone_offset_hours: $timezone_offset_hours) {
      history_count
    }

    history(limit: 30, offset: 0, commands_only: $commands_only){
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
  commandsOnly: boolean;
}

export class History extends Component<Props, State> {

  constructor(props) {
    super(props);
    const query = qs.parse(props.location.search);
    const commandsOnly = !!query.commands;
    this.state = {commandsOnly};
  }

  commandsOnlyChange = (e) => {
    const commandsOnly = e.target.checked;
    this.setState({commandsOnly});
    // TODO does react router help here?
    // TODO put all non-default query params in the url
    history.pushState({}, '', `/history?commands=${commandsOnly}`);
  }

  render() {
    return (
      <Query
        query={HISTORY}
        variables={{
          commands_only: this.state.commandsOnly,
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
                    <label htmlFor='commandsOnly'>
                      <input
                        type='checkbox'
                        name='commandsOnly'
                        id='commandsOnly'
                        checked={this.state.commandsOnly}
                        onChange={this.commandsOnlyChange}
                      />
                      Commands only
                    </label>
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
