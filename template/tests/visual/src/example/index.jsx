import React from 'react';
import ReactDOM from 'react-dom';
import Component from 'lib';

import './index.less';

function App() {
  return (
    <div>
      E2E Testing
      <Component />
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
