import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const HISTORY = gql`
  {
    adapters {
      platform
      uuid
    }
  }
`;

export const History = () => (
  <Query query={HISTORY}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error {error}</p>;

      return (<div>History</div>);
    }}
  </Query>
);
