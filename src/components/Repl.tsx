import React from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';

import {Title} from 'bloomer';

const ADAPTERS = gql`
  {
    adapters {
      platform
      uuid
    }
  }
`;

export const Repl = () => (
  <Query query={ADAPTERS}>
    {({loading, error, data}) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error {error}</p>;

      return (
        <div>
          {data.adapters.map(({platform, uuid}: any) =>
            <div key={uuid}>
              {platform} {uuid}
            </div>
          )}

          <Title>REPL</Title>
          <Title>Parser</Title>
        </div>
      );
    }}
  </Query>
);
