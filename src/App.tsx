import * as React from 'react';
import { Container, Box } from 'bloomer';

// const logo = require('./logo.svg');

class App extends React.Component {
  render() {
    return (
      <Container className="App">
        <header className="App-header">
          <h1 className="App-title">Yetibot</h1>
        </header>
        <Box className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </Box>
      </Container>
    );
  }
}

export default App;
