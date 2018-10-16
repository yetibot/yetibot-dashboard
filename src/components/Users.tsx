import React from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import {Hero, HeroBody, Title, Subtitle, Table, Notification} from 'bloomer';
import * as moment from 'moment';
import {timezoneOffsetHours} from '../util/timezone';
import {NavLink} from 'react-router-dom';

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
      if (loading) return <Notification isColor='info'>Loading...</Notification>;
      if (error) return <Notification isColor='danger'>{error.message}</Notification>;

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
                    <td>
                      <NavLink to={`/user/${user.id}`}>
                        {user.username}
                      </NavLink>
                    </td>
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
