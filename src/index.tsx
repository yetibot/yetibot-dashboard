import ReactDOM from 'react-dom';
import React from 'react';
import {App} from './components/App';

type Foo = {
  name: string,
};

const props: Foo = {
  name: 'yetibot dashboard',
};

ReactDOM.render(<App {...props} />,
                document.body.appendChild(document.createElement('div')));

export const test = {
  isJestWorking: true
};
