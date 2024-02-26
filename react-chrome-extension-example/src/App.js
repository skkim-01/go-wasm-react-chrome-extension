import React from 'react';

import TestPage from './testpage';

import { Router } from 'react-chrome-extension-router';

function App() {
  return (
    <div className="App">
      <Router>
        <TestPage />
      </Router>
    </div>
  );
}

export default App;
