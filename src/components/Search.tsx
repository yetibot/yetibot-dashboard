import React, {Component} from 'react';
import {Icon, Control, Input} from 'bloomer';
import * as qs from 'query-string';
import {withRouter, RouteComponentProps} from 'react-router';

interface Props {
}

class SearchComponent extends Component<RouteComponentProps<Props>> {

  search = (e) => {
    const query = e.target.value;
    console.log('search!', query);
    const queryString = {s: query};
    this.props.history.push(`/history?${qs.stringify(queryString)}`);
  }

  render() {
    return (
      <Control isExpanded={true} hasIcons='left'>
        <Input onKeyUp={this.search} placeholder='Search History' isColor='light' />
        <Icon isSize='small' isAlign='left'><span className='fa fa-search' aria-hidden='true'/></Icon>
      </Control>
    );
  }
}

export const Search = withRouter(SearchComponent);
