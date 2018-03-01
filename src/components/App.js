import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Counter from './Counter';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router';
import { hot } from 'react-hot-loader';

class App extends React.PureComponent {

  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  render() {
    const { store, history } = this.props;
    const date = new Date();
    
    return (      
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <header>
              <p>Header...</p>
            </header>
            <article className="container">
              <Switch>
                <Route exact path="/" component={Counter} />
              </Switch>
            </article>
            <footer>
              <div className="container">
                <p>Footer...</p>
              </div>
            </footer>
          </div>
        </ConnectedRouter>
      </Provider>      
    );
  }
}

//export default App;
export default hot(module)(App);