import React, {Component} from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import {withRouter, RouteComponentProps} from 'react-router';

import {Title, Notification} from 'bloomer';

const QUERY = gql`
  query query($expr: String!) {
    eval(expr: $expr)
  }
`;

interface Props {
}

interface State {
  query: {
    // search
    s?: string,
    // command only
    co?: string,
    yo?: string
  };
}

class ReplComponent extends Component<RouteComponentProps<Props>, State> {

  render = () =>
    <Query
      query={QUERY}
      variables={{
        expr: 'echo hi'
      }}
    >
      {({loading, error, data}) => {
        if (loading) return <Notification isColor='info'>Loading...</Notification>;
        if (error) return <Notification isColor='danger'>{error.message}</Notification>;

        return (
          <div>
            <Title>REPL</Title>
            <div>
              <code>
                {JSON.stringify(data, null, 2)}
              </code>
            </div>
            <Title>Parser</Title>
          </div>
        );
      }}
    </Query>

}

export const Repl = withRouter(ReplComponent);
