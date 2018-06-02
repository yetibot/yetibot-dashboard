import React from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import {Hero, HeroBody, Title, Subtitle, Table} from 'bloomer';
import * as moment from 'moment';

const ALIASES = gql`

  query stats($timezone_offset_hours: Int!) {
    stats(timezone_offset_hours: $timezone_offset_hours) {
      alias_count
    }

    aliases{
      cmd
      cmd_name
      created_at
      id
      user_id
    }

  }
`;

export const Aliases = ({timezoneOffsetHours}) => (
  <Query query={ALIASES} variables={{timezone_offset_hours: timezoneOffsetHours}}>
    {({loading, error, data}) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error {error}</p>;

      return (
        <div>
          <Hero isBold={true} isColor='info' isSize='small'>
            <HeroBody>
              <Title>Aliases</Title>
              <Subtitle>{data.stats.alias_count} Aliases</Subtitle>
            </HeroBody>
          </Hero>

          <Table isStriped={true} className='is-fullwidth is-hoverable'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Command name</th>
                <th>Command</th>
                <th>Created by</th>
                <th>Created at</th>
              </tr>
            </thead>
            <tbody>
              {data.aliases.map(alias => {
                const createdAtUTC = moment.utc(alias.created_at);
                return (
                  <tr key={alias.id}>
                    <td>{alias.id}</td>
                    <td>{alias.cmd}</td>
                    <td>{alias.cmd_name}</td>
                    <td>{alias.user_id}</td>
                    <td title={createdAtUTC.local().format()}>{createdAtUTC.fromNow()}</td>
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
