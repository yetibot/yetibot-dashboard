# Yetibot Dashboard

## Tech

- TypeScript
- Apollo GraphQL Client
- React 16.x
- Sass
- Bulma + Bloomer
- React Router

## TypeScript + Babel 7 + Webpack

TypeScript project built on top of new Babel 7 features. Includes React
16, Jest and Enzyme (for tests). Bundeling is done via webpack. Typechecking and
linting are done on seperate processes, so runs faster on modern multicore cpus.
Also JS is always updated, even if Typechecking or linting throws errors. This
is not the case for production builds.

For development HMR is on per default, so the dev experience is as smooth as
possible.

## Introspect schema

```bash
apollo-codegen introspect-schema http://localhost:3003/graphql --output schema.json
```

## Installation

```sh
git clone https://github.com/damassi/babel-7-typescript-example && cd babel-7-typescript-example
yarn install
```

## Development

```sh
yarn start
yarn test:watch
```

## Production build

```sh
yarn build
```

## Example

```jsx
// App.tsx
import React, { Component } from 'react'

interface Props {
  name: string
}

export const App extends Component<Props> {
  render () {
    return (
      <div>
        Hi {this.props.name} from .tsx!
      </div>
    )
  }
}

// index.ts
import ReactDOM from 'react-dom/server'
import { App } from './components/App'

console.log(ReactDOM.renderToString(<App name='leif' />))
```

```sh
yarn build
```
