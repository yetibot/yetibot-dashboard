import React, {useState, useEffect} from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import {
  Hero, HeroBody, Title, Subtitle, Field,
  Input,
  // FieldLabel, Control,
  Icon, Notification} from 'bloomer';
import moment from 'moment';
import {timezoneOffsetHours} from '../util/timezone';
import qs from 'query-string';
import {withRouter, RouteComponentProps} from 'react-router';
import {NavLink} from 'react-router-dom';
import _ from 'lodash';
import bulmaCalendar from 'bulma-calendar';

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


const HistoryHooked = (props: RouteComponentProps<Props>) => {

  const [query] = useState({});

  const updateQueryState = (queryStateToMerge: any) => {
    const currentQuery = query; // this.state.query;
    const newQuery = _.pickBy({...currentQuery, ...queryStateToMerge},
                              (v, k) => v !== '0');
    props.history.push(`/history?${qs.stringify(newQuery)}`);
  }

  const booleanChange = (key: string, e: any) => {
    const val = e.target.checked ? '1' : '0';
    updateQueryState({[key]: val});
  }

  const hasFiltersSet = () => !(_.isEmpty(query));

  const booleanValue = (key: string) => query[key] === '1';

  const booleanElement = ({label, shortOption}: any) => (
    <li key={label}>
      <Field key={shortOption} className='checkbox-field'>
        <input
          id={shortOption}
          className='is-small is-white has-background-color is-checkradio'
          type='checkbox'
          checked={booleanValue(shortOption)}
          onChange={_.partial(booleanChange, shortOption)}
        />
        <label htmlFor={shortOption}>{label}</label>
      </Field>
    </li>
  );

  console.log('render');

  // re-render calendar widget after every render
  useEffect(() => {
    console.log('attach bulma calendar');
    bulmaCalendar.attach('[type="date"]', {}) }, []);

  console.log('rendering...');
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
                  {_.map(_.take(_.values(booleanOptions), 2), booleanElement)}
                </ol>
                <ol>
                  {_.map(_.drop(_.values(booleanOptions), 2), booleanElement)}
                </ol>

                {false
                  ? <Field isHorizontal={true} style={{marginRight: 20}}>
                      <span>Searching for
                        <span className='query'>TODO</span>
                      </span>
                    </Field>
                  : ''}
                <ol>
                  <li>
                    <Field isHorizontal={true}>
                      <Input type='date' isSize='small' placeholder='Since YYYY-MM-DD' />
                    </Field>
                  </li>
                  <li>
                    <Field isHorizontal={true}>
                      <Input type='date' isSize='small' placeholder='Until YYYY-MM-DD' />
                    </Field>
                  </li>
                </ol>
                {hasFiltersSet()
                  ? (<NavLink className='button is-small is-light' to='/history'>
                      <Icon isSize='small' isAlign='left'
                        className='fa fa-times-circle' />
                       <span>Clear All Filters</span>
                     </NavLink>)
                       : null}
              </Field>
            </div>

            <div className="history columns is-fullheight is-gapless">
              <div className="column has-background-white-bis is-one-fifth">
                <div className="filters ">
                  <div className="field">
                    <input
                      className="is-checkradio is-block is-dark"
                      id="exampleCheckboxBlockDefault"
                      type="checkbox"
                      name="exampleCheckboxBlockDefault"
                      defaultChecked={true}
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
};

export const History = withRouter(HistoryHooked);
