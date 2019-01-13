import React, {Component} from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import {Hero, HeroBody, Title, Notification} from 'bloomer';
import {withRouter, RouteComponentProps} from 'react-router';

const USER = gql`
  query user($user_id: String!) {
    user(id: $user_id) {
      id
      username
    }
  }
`;

interface Props {
  id?: string;
}

interface State {
}

class UserComponent extends Component<RouteComponentProps<Props>, State> {

  render() {
    return (
      <Query query={USER} variables={{user_id: this.props.match.params.id}}>
        {({loading, error, data}) => {
          if (loading) return <Notification isColor='info'>Loading...</Notification>;
          if (error) return <Notification isColor='danger'>{error.message}</Notification>;

          if (data.user) {
            return (
              <div>
                <Hero isBold={true} isColor='info' isSize='small'>
                  <HeroBody>
                    <Title>{data.user.username}</Title>
                  </HeroBody>
                </Hero>
              </div>
            );
          } else {
            return (
              <div>
                <Hero isBold={true} isColor='danger' isSize='small'>
                  <HeroBody>
                    <Title>User not found</Title>
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

export const User = withRouter(UserComponent);
