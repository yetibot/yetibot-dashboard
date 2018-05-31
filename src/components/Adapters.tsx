import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import {Hero, HeroBody, Title, Subtitle, Table} from 'bloomer';

const ADAPTERS = gql`
  query stats($timezone_offset_hours: Int!) {
    stats(timezone_offset_hours: $timezone_offset_hours) {
      adapter_count
    }

    adapters {
      platform
      uuid
    }
  }
`;

export const Adapters = ({timezoneOffsetHours}) => (
  <Query query={ADAPTERS} variables={{timezone_offset_hours: timezoneOffsetHours}}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error {error}</p>;

      return (
        <div>

          <Hero isBold={true} isColor='info' isSize='small'>
            <HeroBody>
              <Title>Adapters</Title>
              <Subtitle>Configured adapters: {data.stats.adapter_count}</Subtitle>
            </HeroBody>
          </Hero>

          <Table isStriped={true} className='is-fullwidth is-hoverable'>
            <thead>
              <tr>
                <th>Platform</th>
                <th>UUID</th>
              </tr>
            </thead>
            <tbody>
              {data.adapters.map(({platform, uuid}) =>
                <tr key={uuid}>
                  <td>{platform}</td>
                  <td>{uuid}</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      );
    }}
  </Query>
);
