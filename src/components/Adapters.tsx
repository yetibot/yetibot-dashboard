import React from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import {Hero, HeroBody, Title, Subtitle, Table, Notification} from 'bloomer';
import {timezoneOffsetHours} from '../util/timezone';

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
                <th>Connected?</th>
                <th>Last known latency</th>
              </tr>
            </thead>
            <tbody>
              {data.adapters.map(({platform, uuid, is_connected, connection_latency}) =>
                <tr key={uuid}>
                  <td>{platform}</td>
                  <td>{uuid}</td>
                  <td>{(is_connected) ? '✅' : ''}</td>
                  <td>{connection_latency} ms</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      );
    }}
  </Query>
);
