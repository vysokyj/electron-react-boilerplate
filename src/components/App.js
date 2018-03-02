import React, { Component } from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { Route, Switch } from "react-router";
import { Link } from "react-router-dom";
import { hot } from "react-hot-loader";
import RepoPage from "./RepoPage";
import CounterPage from "./CounterPage";

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
                            <Link to="/">Counter</Link> <Link to="/repo">Repo</Link>
                        </header>
                        <article className="container">
                            <Switch>
                                <Route exact path="/" component={CounterPage} />
                                <Route exact path="/repo" component={RepoPage} />
                            </Switch>
                        </article>
                        <footer>
                        </footer>
                    </div>
                </ConnectedRouter>
            </Provider>
        );
    }
}

//export default App;
export default hot(module)(App);