import React, {Component} from 'react';
import {Icon, Control, Input} from 'bloomer';
import * as qs from 'query-string';
import {withRouter, RouteComponentProps} from 'react-router';
import _ from 'lodash';

interface Props {
}

interface State {
  search: string;
}

class SearchComponent extends Component<RouteComponentProps<Props>, State> {

  constructor(props: any) {
    super(props);
    const query = qs.parse(props.location.search);
    this.state = {search: (query.s as string) || ''};
    console.log('SearchComponent', query);
  }

  componentDidUpdate(prevProps: any) {
    const prevQuery = qs.parse(prevProps.location.search);
    const query = qs.parse(this.props.location.search);
    if (!_.isEqual(prevQuery, query)) {
      this.setState({search: (query.s as string) || ''});
    }
  }

  searchChange = (e: any) => {
    const query = e.target.value;
    this.setState({search: query});
    console.log('searchChange', query);
    const currentQuery = qs.parse(this.props.location.search);
    const queryString = {...currentQuery, s: query};
    this.props.history.push(`/history?${qs.stringify(queryString)}`);
  }

  render() {
    return (
      <Control isExpanded={true} hasIcons='left'>
        <Input
          value={this.state.search}
          onChange={this.searchChange}
          placeholder='Search History'
          isColor='light'
        />
        <Icon isSize='small' isAlign='left'><span className='fa fa-search' aria-hidden='true'/></Icon>
      </Control>
    );
  }
}

export const Search = withRouter(SearchComponent);
