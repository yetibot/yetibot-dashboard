import React from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import {Hero, HeroBody, Title, Subtitle, Table, Notification} from 'bloomer';
import * as moment from 'moment';
import {timezoneOffsetHours} from '../util/timezone';

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

export const Aliases = () => (
  <Query query={ALIASES} variables={{timezone_offset_hours: timezoneOffsetHours}}>
    {({loading, error, data}) => {
      if (loading) return <Notification isColor='info'>Loading...</Notification>;
      if (error) return <Notification isColor='danger'>{error.message}</Notification>;

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
                <th>Alias</th>
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
                    <td title={alias.id}>{alias.cmd}</td>
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
