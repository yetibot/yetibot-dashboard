import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from 'graphql-tag';

const ADAPTERS = gql`
  {
    adapters {
      platform
      uuid
    }
  }
`;

export const Adapters = () => (
  <Query query={ADAPTERS}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error {error}</p>;

      return data.adapters.map(({ platform, uuid }) =>
        <div key={uuid}>
          {platform} {uuid}
        </div>
      );
    }}
  </Query>
);
