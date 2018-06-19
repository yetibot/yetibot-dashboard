import React from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import {Hero, HeroBody, Title, Subtitle, Table} from 'bloomer';
import * as moment from 'moment';
import {timezoneOffsetHours} from '../util/timezone';

const USERS = gql`

  query stats($timezone_offset_hours: Int!) {
    stats(timezone_offset_hours: $timezone_offset_hours) {
      user_count
    }

    users {
      id
      is_active
      last_active
      username
    }
  }
`;

export const Users = () => (
  <Query query={USERS} variables={{timezone_offset_hours: timezoneOffsetHours}}>
    {({loading, error, data}) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error {error}</p>;

      return (
        <div>
          <Hero isBold={true} isColor='info' isSize='small'>
            <HeroBody>
              <Title>Users</Title>
              <Subtitle>{data.stats.user_count} Users</Subtitle>
            </HeroBody>
          </Hero>

          <Table isStriped={true} className='is-fullwidth is-hoverable'>
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Active?</th>
                <th>Last active</th>
              </tr>
            </thead>
            <tbody>
              {data.users.map(user => {
                const lastActiveUTC = moment.utc(user.last_active);
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.is_active ? '✅' : ''}</td>
                    <td title={lastActiveUTC.local().format()}>{lastActiveUTC.fromNow()}</td>
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
