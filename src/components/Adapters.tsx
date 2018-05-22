import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import {Table} from 'bloomer';

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

      return (
        <Table isStriped={true} className="is-fullwidth is-hoverable">
          <thead>
            <tr>
              <th>Platform</th>
              <th>UUID</th>
            </tr>
          </thead>
          <tbody>
            {data.adapters.map(({platform, uuid}) =>
              <tr key={uuid}>
                <td>{platform}</td>
                <td>{uuid}</td>
              </tr>
            )}
          </tbody>
        </Table>
      );
    }}
  </Query>
);
