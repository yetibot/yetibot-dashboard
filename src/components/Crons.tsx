import React from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import {Hero, HeroBody, Title, Subtitle, Table} from 'bloomer';
import * as moment from 'moment';
import {timezoneOffsetHours} from '../util/timezone';

const CRONS = gql`

  query stats($timezone_offset_hours: Int!) {
    stats(timezone_offset_hours: $timezone_offset_hours) {
      cron_count
    }

    crons {
      chat_source_adapter
      chat_source_room
      cmd
      created_at
      id
      schedule
      user_id
    }

  }
`;

export const Crons = () => (
  <Query query={CRONS} variables={{timezone_offset_hours: timezoneOffsetHours}}>
    {({loading, error, data}) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error {error}</p>;

      return (
        <div>
          <Hero isBold={true} isColor='info' isSize='small'>
            <HeroBody>
              <Title>Cron Tasks</Title>
              <Subtitle>{data.stats.cron_count} Cron Tasks</Subtitle>
            </HeroBody>
          </Hero>

          <Table isStriped={true} className='is-fullwidth is-hoverable'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Schedule</th>
                <th>Command</th>
                <th>Chat source adapter</th>
                <th>Chat source room</th>
                <th>Created by</th>
                <th>Created at</th>
              </tr>
            </thead>
            <tbody>
              {data.crons.map(cron => {
                const createdAtUTC = moment.utc(cron.created_at);
                return (
                  <tr key={cron.id}>
                    <td>{cron.id}</td>
                    <td>{cron.schedule}</td>
                    <td>{cron.cmd}</td>
                    <td>{cron.chat_source_adapter}</td>
                    <td>{cron.chat_source_room}</td>
                    <td>{cron.user_id}</td>
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
