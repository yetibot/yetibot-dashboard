import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

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
      return <div>Dashboard</div>;
    }}
  </Query>
);
