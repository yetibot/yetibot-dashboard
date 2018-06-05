import * as React from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import {Tile, Hero, HeroBody, Title, Subtitle} from 'bloomer';
import {timezoneOffsetHours} from '../util/timezone';

const DASHBOARD = gql`
  query stats($timezone_offset_hours: Int!) {
    stats(timezone_offset_hours: $timezone_offset_hours) {
      uptime
      adapter_count
      user_count
      command_count_today
      command_count
      history_count
      history_count_today
      alias_count
      observer_count
      cron_count
    }
  }
`;

interface DashboardProps {
}

export const Dashboard: React.SFC<DashboardProps> = () => (
  <Query query={DASHBOARD} variables={{timezone_offset_hours: timezoneOffsetHours}}>
    {({loading, error, data}) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error {error}</p>;
      const stats = data.stats;
      return (
        <div>
          <Hero isBold={true} isColor='info' isSize='small'>
            <HeroBody>
              <Title>Dashboard</Title>
              <Subtitle>Uptime {stats.uptime}</Subtitle>
            </HeroBody>
          </Hero>

          <div className='tiles'>
            <Tile isAncestor={true} hasTextAlign='centered'>

                <Tile isSize={4} isParent={true}>
                  <Tile isChild={true} className='box'>
                    <Title>{stats.adapter_count}</Title>
                    <Subtitle>Adapters</Subtitle>
                  </Tile>
                </Tile>

                <Tile isSize={4} isParent={true}>
                  <Tile isChild={true} className='box'>
                    <Title>{stats.command_count}</Title>
                    <Subtitle>Commands</Subtitle>
                  </Tile>
                </Tile>

                <Tile isSize={4} isParent={true}>
                  <Tile isChild={true} className='box'>
                    <Title>{stats.command_count_today}</Title>
                    <Subtitle>Commands today</Subtitle>
                  </Tile>
                </Tile>

                <Tile isSize={4} isParent={true}>
                  <Tile isChild={true} className='box'>
                    <Title>{stats.user_count}</Title>
                    <Subtitle>Users</Subtitle>
                  </Tile>
                </Tile>

                <Tile isSize={4} isParent={true}>
                  <Tile isChild={true} className='box'>
                    <Title>{stats.history_count}</Title>
                    <Subtitle>History items</Subtitle>
                  </Tile>
                </Tile>

                <Tile isSize={4} isParent={true}>
                  <Tile isChild={true} className='box'>
                    <Title>{stats.history_count_today}</Title>
                    <Subtitle>History items today</Subtitle>
                  </Tile>
                </Tile>

                <Tile isSize={4} isParent={true}>
                  <Tile isChild={true} className='box'>
                    <Title>{stats.alias_count}</Title>
                    <Subtitle>Aliases</Subtitle>
                  </Tile>
                </Tile>

                <Tile isSize={4} isParent={true}>
                  <Tile isChild={true} className='box'>
                    <Title>{stats.observer_count}</Title>
                    <Subtitle>Observers</Subtitle>
                  </Tile>
                </Tile>

                <Tile isSize={4} isParent={true}>
                  <Tile isChild={true} className='box'>
                    <Title>{stats.cron_count}</Title>
                    <Subtitle>Cron tasks</Subtitle>
                  </Tile>
                </Tile>

                {/* These need a different way to be displayed - maybe charts
                * Other ideas:
                * - Number of Errors
                * - Average Yetibot response time
                */}

                {/* <Tile isSize={4} isParent={true}> */}
                {/*   <Tile isChild={true} className='box'> */}
                {/*     <Title>34 / 55</Title> */}
                {/*     <Subtitle>Configured commmands / available commands</Subtitle> */}
                {/*   </Tile> */}
                {/* </Tile> */}

                {/* <Tile isSize={4} isParent={true}> */}
                {/*   <Tile isChild={true} className='box'> */}
                {/*     <Title>Top 3 Commands</Title> */}
                {/*     <Subtitle>Foo bar</Subtitle> */}
                {/*   </Tile> */}
                {/* </Tile> */}

            </Tile>
          </div>

        </div>
      );
    }}
  </Query>
);
