import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import {Adapters} from './Adapters';

const client = new ApolloClient({
  uri: 'http://localhost:3003/graphql'
});

const ADAPTERS = gql`
  {
    adapters {
      platform
      uuid
    }
  }
`;

console.log(ADAPTERS);
client
  .query({ query: ADAPTERS })
  .then(result => console.log('result!', result));

interface Props {
  name: string;
}

export class App extends Component<Props> {
  render () {
    return (
      <ApolloProvider client={client}>
        <div>
          hi {this.props.name} from tsx!
        </div>
        <Adapters />
      </ApolloProvider>
    );
  }
}
