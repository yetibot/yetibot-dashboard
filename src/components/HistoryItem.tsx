import React, {Component} from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import {Hero, HeroBody, Title, Notification} from 'bloomer';
import {withRouter, RouteComponentProps} from 'react-router';

const HISTORY = gql`
  query history_item($history_id: String!) {
    history_item(id: $history_id) {
      id
    }
  }
`;

interface Props {
  id: String;
}

interface State {
}

class HistoryItemComponent extends Component<RouteComponentProps<Props>, State> {

  render() {
    return (
      <Query query={HISTORY} variables={{history_id: this.props.match.params.id}}>
        {({loading, error, data}) => {
          if (loading) return <Notification isColor='info'>Loading...</Notification>;
          if (error) return <Notification isColor='danger'>{error.message}</Notification>;

          if (data.history) {
            return (
              <div>
                <Hero isBold={true} isColor='info' isSize='small'>
                  <HeroBody>
                    <Title>{data.history.historyname}</Title>
                  </HeroBody>
                </Hero>
              </div>
            );
          } else {
            return (
              <div>
                <Hero isBold={true} isColor='danger' isSize='small'>
                  <HeroBody>
                    <Title>History not found</Title>
                  </HeroBody>
                </Hero>
              </div>
            );
          }
        }}
      </Query>
    );
  }
}

export const HistoryItem = withRouter(HistoryItemComponent);
