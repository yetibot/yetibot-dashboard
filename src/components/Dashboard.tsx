import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Hero, HeroBody, Title } from 'bloomer';

const DASHBOARD = gql`
  {
    adapters {
      platform
      uuid
    }
  }
`;

export const Dashboard = () => (
  <Query query={DASHBOARD}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error {error}</p>;
      return (
        <div>
          <Hero isBold isColor='info' isSize='small'>
            <HeroBody>
              <Title>
                Yetibot Dashboard
              </Title>
            </HeroBody>
          </Hero>

        </div>
      );
    }}
  </Query>
);
