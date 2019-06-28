import React, {Component} from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import {
  Hero, HeroBody, Title, Subtitle, Table, Field,
  Input,
  // FieldLabel, Control,
  Icon, Notification} from 'bloomer';
import moment from 'moment';
import {timezoneOffsetHours} from '../util/timezone';
import qs from 'query-string';
import {withRouter, RouteComponentProps} from 'react-router';
import {NavLink} from 'react-router-dom';
import _ from 'lodash';
// import Select from 'react-select';

const HISTORY = gql`

  query history(
    $timezone_offset_hours: Int!,
    $yetibot_only: Boolean!,
    $commands_only: Boolean!,
    $search_query: String
  ) {
    stats(timezone_offset_hours: $timezone_offset_hours) {
      history_count
    }

    adapter_channels {
      chat_source_adapter
      channels {
        chat_source_room
        chat_source_adapter
      }
    }

    history (
      first: 30,
    ) {
      page_info {
        has_next_page
        total_results
        next_page_cursor
      }
      history {
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
  }
`;


interface Props {
}

interface State {
  query: {
    y?: string,
    e?: string,
    n?: string,
    h?: string,
    s?: string
  };
}

// [["-h" "--include-history-commands"]
// ["-y" "--exclude-yetibot"]
// ["-e" "--exclude-commands"]
// ["-n" "--exclude-non-commands"]
// ["-a" "--include-all-channels"]
// ["-c" "--channels CHANNEL1,CHANNEL2"]
// ["-u" "--user USER1,USER2"]
// ["-s" "--since DATE"]
// ["-v" "--until DATE"]]

const booleanOptions = {
  "excludeYetibot": {
    label: "Exclude Yetibot responses",
    shortOption: "y"
  },
  "excludeCommands": {
    label: "Exclude commands",
    shortOption: "e",
  },
  "excludeNonCommands": {
    label: "Exclude non-commands",
    shortOption: 'n'
  },
  // channel
  "includeHistoryCommands": {
    label: "Include history commands",
    shortOption: 'h'
  }
  // Keep `includeAllChannels` on by default since the web dashboard is not in a
};

type ShortOptionKey = 'y' | 'e' | 'n' | 'h';

class HistoryComponent extends Component<RouteComponentProps<Props>, State> {

  state = ({query: {}} as State);

  componentDidMount() {
    const {y, e, n, h, s} = qs.parse(this.props.location.search);
    this.setStateFromQuery({y, e, n, h, s});
    console.log('History mounted');
  }

  hasFiltersSet = () => !(_.isEmpty(this.state.query));

  componentDidUpdate(prevProps: any) {
    // If the query was updated, propogate the change to History
    if (!_.isEqual(prevProps.location.search, this.props.location.search)) {
      const {y, e, n, h, s} = qs.parse(this.props.location.search);
      this.setStateFromQuery({y, e, n, h, s});
    }
  }

  setStateFromQuery({y, e, n, h, s}: any) {
    this.setState({query: {y, e, n, h, s}});
  }

  // store query state on state.query then serialize it and reflect it in
  // the browser location query string
  updateQueryState = (queryStateToMerge: any) => {
    const currentQuery = this.state.query;
    const newQuery = _.pickBy({...currentQuery, ...queryStateToMerge},
                              (v, k) => v !== '0');

    this.props.history.push(`/history?${qs.stringify(newQuery)}`);
  }

  // commandsOnlyChange = (e: any) => {
  //   const co = e.target.checked ? '1' : '0';
  //   this.updateQueryState({co});
  // }
  // yetibotOnlyChange = (e: any) => {
  //   const yo = e.target.checked ? '1' : '0';
  //   this.updateQueryState({yo});
  // }
  // isCommandsOnly = () => (this.state.query.co === '1');
  //
  // isYetibotOnly = () => (this.state.query.yo === '1');

  booleanChange = (key: string, e: any) => {
    const val = e.target.checked ? '1' : '0';
    this.updateQueryState({[key]: val});
  }

  booleanValue = (key: string) =>
    this.state.query[key] === '1';

  searchQuery = () => {
    const st = this.state.query.s;
    // explicity return undefined for null or empty strings
    return (st) ? st : undefined;
  }

  booleanElement = ({label, shortOption}: any) =>
    <li>
      <Field key={shortOption} className='checkbox-field'>
        <input
          id={shortOption}
          className='is-small is-white has-background-color is-checkradio'
          type='checkbox'
          checked={this.booleanValue(shortOption)}
          onChange={_.partial(this.booleanChange, shortOption)}
        />
        <label htmlFor={shortOption}>{label}</label>
      </Field>
    </li>


  render() {
    const query = this.searchQuery();
    return (
      <Query
        query={HISTORY}
        pollInterval={0}
        variables={{
          commands_only: false,
          yetibot_only: false,
          search_query: query,
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
                  <Subtitle>
                    Total items {data.stats.history_count}
                  </Subtitle>
                </HeroBody>
              </Hero>

              <div className='history-filters'>
                <Field isHorizontal={true}>
                  <ol>
                    {_.map(_.take(_.values(booleanOptions), 2), this.booleanElement)}
                  </ol>
                  <ol>
                    {_.map(_.drop(_.values(booleanOptions), 2), this.booleanElement)}
                  </ol>

                  {query
                    ? <Field isHorizontal={true} style={{marginRight: 20}}>
                        <span>Searching for
                          <span className='query'>{query}</span>
                        </span>
                      </Field>
                    : ''}
                  <ol>
                    <li>
                      <Field isHorizontal={true}>
                        <Input isSize='small' placeholder='Since YYYY-MM-DD' />
                      </Field>
                    </li>
                    <li>
                      <Field isHorizontal={true}>
                        <Input isSize='small' placeholder='Until YYYY-MM-DD' />
                      </Field>
                    </li>
                  </ol>
                  {this.hasFiltersSet()
                    ? (<NavLink className='button is-small is-light' to='/history'>
                        <Icon isSize='small' isAlign='left'
                          className='fa fa-times-circle' />
                         <span>Clear All Filters</span>
                       </NavLink>)
                         : null}
                </Field>
              </div>

              <div className="history columns is-gapless">
                <div className="column is-one-fifth">
                  <div className="filters has-background-white-bis">
                    <div className="field">
                      <input
                        className="is-checkradio is-block is-dark"
                        id="exampleCheckboxBlockDefault"
                        type="checkbox"
                        name="exampleCheckboxBlockDefault"
                        checked={true}
                      />
                      <label htmlFor="exampleCheckboxBlockDefault">
                        All Channels
                      </label>
                    </div>

                    <p>Filter channels</p>
                    {data.adapter_channels
                      .flatMap(({channels}: {channels: [any]}) => channels)
                      .map(({chat_source_adapter, chat_source_room}:
                            {chat_source_adapter: string, chat_source_room: string}) =>
                        <div key={chat_source_adapter + chat_source_room}>
                          <span className="tag is-dark">
                            {chat_source_adapter} {chat_source_room}
                          </span>
                        </div>
                      )
                    }
                  </div>
                </div>
                <div className="column is-four-fifths has-background-white">
                  <div className="history-body">
                    {data.history && data.history.history.map((historyItem: any) => {
                      const createdAtUTC = moment.utc(historyItem.created_at);
                      return (
                        <div className="history-item" key={historyItem.id}>
                          <div>
                            <span
                              title={`Adapter ${historyItem.chat_source_adapter}`}
                              className="tag is-dark">{historyItem.chat_source_room}</span>
                            &nbsp;
                            <span title={createdAtUTC.local().format()}>{createdAtUTC.fromNow()}</span>
                            &nbsp;
                            <strong title={`User ID ${historyItem.user_id}`}>{historyItem.user_name}</strong>
                            &nbsp;
                            {(historyItem.is_command)
                              ? <span className="tag is-link">Command </span>
                              : null}
                            {(historyItem.is_yetibot)
                              ? <span className="tag is-warning">Yetibot</span>
                              : ''}
                          </div>
                          <div title={historyItem.id}>{historyItem.body}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div>
                <pre>
                  {JSON.stringify(data, null, 2)}
                </pre>
              </div>

            </div>
          );
        }}
      </Query>
    );
  }

}

export const History = withRouter(HistoryComponent);
