# yetibot-dashboard

A static dashboard that runs against Yetibot's GraphQL API. This npm module is
consumed and served by [yetibot.core](https://github.com/yetibot/yetibot.core).

[![npm](https://img.shields.io/npm/v/yetibot-dashboard.svg?style=for-the-badge)](https://www.npmjs.com/package/yetibot-dashboard)
[![Travis](https://img.shields.io/travis/yetibot/yetibot-dashboard.svg?style=for-the-badge)](https://travis-ci.org/yetibot/yetibot-dashboard)

## DigitalOcean sponsorship

<p>This project is supported by:</p>
<p>
  <a href="https://www.digitalocean.com/">
    <img src="https://opensource.nyc3.cdn.digitaloceanspaces.com/attribution/assets/SVG/DO_Logo_horizontal_blue.svg" width="201px">
  </a>
</p>


## Tech

- TypeScript
- Apollo Client
- React 16.x
- Sass
- Font Awesome 5
- Bulma + Bloomer
- React Router

## Development

```sh
yarn start
```

## Production build

```sh
yarn build
```

## Publish

NPM package is auto-published by Travis on all tags. To publish, use one of:

```bash
yarn version --major
yarn version --minor
yarn version --patch
```

This creates a commit and git tag. Now simply `git push` and Travis will
deploy the new package.
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Introspect schema

(This doesn't work currently - use apollo CLI to get it working again).

```bash
apollo-codegen introspect-schema http://localhost:3003/graphql --output schema.json
```

## Available Scripts

This project was generated with `create-react-app --typescript`.

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in thewser.

The page will reload if you make edits. You will also see any lint errors in the
console.

### `yarn test`

Launches the test runner in the interactive watch mode. See the section
about [running
tests](https://facebook.github.io/create-react-app/docs/running-tests) for more
information.

### `yarn run build`

Builds the app for production to the `build` folder. It correctly bundles
React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes. Your app is
ready to be deployed!

See the section about
[deployment](https://facebook.github.io/create-react-app/docs/deployment) for
more information.

### `yarn run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can
`eject` at any time. This command will remove the single build dependency from
your project.

Instead, it will copy all the configuration files and the transitive
dependencies (Webpack, Babel, ESLint, etc) right into your project so you have
full control over them. All of the commands except `eject` will still work, but
they will point to the copied scripts so you can tweak them. At this point
you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for
small and middle deployments, and you shouldn’t feel obligated to use this
feature. However we understand that this tool wouldn’t be useful if you couldn’t
customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App
documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
