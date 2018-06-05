import React from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import {Hero, HeroBody, Title, Subtitle, Table} from 'bloomer';
import * as moment from 'moment';
import {timezoneOffsetHours} from '../util/timezone';

const OBSERVERS = gql`

  query stats($timezone_offset_hours: Int!) {
    stats(timezone_offset_hours: $timezone_offset_hours) {
      observer_count
    }

    observers{
      channel_pattern
      cmd
      event_type
      id
      pattern
      user_id
      user_pattern
      created_at
    }

  }
`;

export const Observers = () => (
  <Query query={OBSERVERS} variables={{timezone_offset_hours: timezoneOffsetHours}}>
    {({loading, error, data}) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error {error}</p>;

      return (
        <div>
          <Hero isBold={true} isColor='info' isSize='small'>
            <HeroBody>
              <Title>Observers</Title>
              <Subtitle>{data.stats.observer_count} Observers</Subtitle>
            </HeroBody>
          </Hero>

          <Table isStriped={true} className='is-fullwidth is-hoverable'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Pattern</th>
                <th>Command</th>
                <th>Event type</th>
                <th>Channel pattern</th>
                <th>User pattern</th>
                <th>Created by</th>
                <th>Created at</th>
              </tr>
            </thead>
            <tbody>
              {data.observers.map(observer => {
                const createdAtUTC = moment.utc(observer.created_at);
                return (
                  <tr key={observer.id}>
                    <td>{observer.id}</td>
                    <td>{observer.pattern}</td>
                    <td>{observer.cmd}</td>
                    <td>{observer.event_type}</td>
                    <td>{observer.user_pattern}</td>
                    <td>{observer.channel_pattern}</td>
                    <td>{observer.user_id}</td>
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
