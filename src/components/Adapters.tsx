import React from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import {Hero, HeroBody, Title, Subtitle, Table, Notification} from 'bloomer';
import {timezoneOffsetHours} from '../util/timezone';
import moment from 'moment';

const ADAPTERS = gql`
  query stats($timezone_offset_hours: Int!) {
    stats(timezone_offset_hours: $timezone_offset_hours) {
      adapter_count
    }

    adapters {
      platform
      uuid
      is_connected
      connection_latency
      connection_last_active_timestamp
    }
  }
`;

export const Adapters = () => (
  <Query query={ADAPTERS} variables={{timezone_offset_hours: timezoneOffsetHours}}>
    {({loading, error, data}) => {
      if (loading) return <Notification isColor='info'>Loading...</Notification>;
      if (error) return <Notification isColor='danger'>{error.message}</Notification>;

      return (
        <div>

          <Hero isBold={true} isColor='info' isSize='small'>
            <HeroBody>
              <Title>Adapters</Title>
              <Subtitle>{data.stats.adapter_count} Adapters</Subtitle>
            </HeroBody>
          </Hero>

          <Table isStriped={true} className='is-fullwidth is-hoverable'>
            <thead>
              <tr>
                <th>Platform</th>
                <th>UUID</th>
                <th title='Is this adapter connected?'>Connected?</th>
                <th title='Round trip latency recorded at the last active timestamp'>Last known latency</th>
                <th title='Timestamp from when we last confirmed that the connection to this Adapter was active'>
                  Last active
                </th>
              </tr>
            </thead>
            <tbody>
              {data.adapters.map(({
                platform,
                uuid,
                is_connected,
                connection_last_active_timestamp,
                connection_latency
              }: {
                platform: string,
                uuid: string,
                is_connected: string,
                connection_last_active_timestamp: string,
                connection_latency: string
              }) => {
                const lastActiveUTC = moment(new Date(parseInt(connection_last_active_timestamp)));
                return (
                  <tr key={uuid}>
                    <td>{platform}</td>
                    <td>{uuid}</td>
                    <td>{(is_connected) ? '✅' : '❌'}</td>
                    <td>{connection_latency} ms</td>
                    <td title={lastActiveUTC.local().format()}>
                      {lastActiveUTC.fromNow()}
                    </td>
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
