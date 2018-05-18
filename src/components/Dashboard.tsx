import React from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import {Tile, Hero, HeroBody, Title, Subtitle, Box} from 'bloomer';

const DASHBOARD = gql`
  query stats($timezone_offset_hours: Int!) {
    stats(timezone_offset_hours: $timezone_offset_hours) {
      uptime
      adapters
      users
      command_count_today
      command_count
      history_count
      history_count_today
    }
  }
`;

export const Dashboard = ({timezoneOffsetHours}) => (
  <Query query={DASHBOARD} variables={{timezone_offset_hours: timezoneOffsetHours}}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error {error}</p>;
      const stats = data.stats;
      return (
        <div>
          <Hero isBold isColor='info' isSize='small'>
            <HeroBody>
              <Title>Dashboard</Title>
              <Subtitle>Uptime {stats.uptime}</Subtitle>
            </HeroBody>
          </Hero>

          <div className='tiles'>
            <Tile isAncestor hasTextAlign='center'>

                <Tile isSize={4} isParent>
                  <Tile isChild className='box'>
                    <Title>{stats.adapters}</Title>
                    <Subtitle>Adapters</Subtitle>
                  </Tile>
                </Tile>

                <Tile isSize={4} isParent>
                  <Tile isChild className='box'>
                    <Title>{stats.command_count}</Title>
                    <Subtitle>Commands</Subtitle>
                  </Tile>
                </Tile>

                <Tile isSize={4} isParent>
                  <Tile isChild className='box'>
                    <Title>{stats.command_count_today}</Title>
                    <Subtitle>Commands today</Subtitle>
                  </Tile>
                </Tile>

                <Tile isSize={4} isParent>
                  <Tile isChild className='box'>
                    <Title>{stats.users}</Title>
                    <Subtitle>Users</Subtitle>
                  </Tile>
                </Tile>


                <Tile isSize={4} isParent>
                  <Tile isChild className='box'>
                    <Title>{stats.history_count}</Title>
                    <Subtitle>History items</Subtitle>
                  </Tile>
                </Tile>

                <Tile isSize={4} isParent>
                  <Tile isChild className='box'>
                    <Title>{stats.history_count_today}</Title>
                    <Subtitle>History items today</Subtitle>
                  </Tile>
                </Tile>

                {/* These need a different way to be displayed - maybe charts
                * Other ideas:
                * - Number of Errors
                * - Average Yetibot response time
                */}

                {/* <Tile isSize={4} isParent> */}
                {/*   <Tile isChild className='box'> */}
                {/*     <Title>34 / 55</Title> */}
                {/*     <Subtitle>Configured commmands / available commands</Subtitle> */}
                {/*   </Tile> */}
                {/* </Tile> */}

                {/* <Tile isSize={4} isParent> */}
                {/*   <Tile isChild className='box'> */}
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
