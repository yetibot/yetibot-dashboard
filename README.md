# Yetibot Dashboard

A static dashboard that runs against Yetibot's GraphQL API. This npm module is
consumed and served by [yetibot.core](https://github.com/yetibot/yetibot.core).

## Tech

- TypeScript
- Webpack
- Apollo Client
- React 16.x
- Sass
- Font Awesome 5
- Bulma + Bloomer
- React Router

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

## Publish

Use one of:

```bash
yarn publish --major
yarn publish --minor
yarn publish --patch
```
