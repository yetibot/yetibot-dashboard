import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Adapters } from './Adapters';
import { Container, Box } from 'bloomer';
// import 'bulma/css/bulma.css';
// import bulma from '~bulma/bulma.sass';
import 'bulma/bulma.sass';

const client = new ApolloClient({
  uri: 'http://localhost:3003/graphql'
});

interface Props {
  name: string;
}

export class App extends Component<Props> {
  render () {
    return (
      <ApolloProvider client={client}>
        <Container>
          <Box>
            hi {this.props.name} from tsx!
          </Box>
          <Adapters />
        </Container>
      </ApolloProvider>
    );
  }
}
