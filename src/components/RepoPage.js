import React, { PureComponent } from "react";
import * as githubActions from "../actions/github";
import * as schemas from "../schemas";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {denormalize} from "normalizr";

class RepoPage extends PureComponent {

    componentWillMount() {
        this.props.githubActions.getRepositories();
    }

    render() {
        const {repositories} = this.props;
       
        const listItems = repositories ? repositories.map((repository) =>
            <li key={repository.id}><b>{repository.name}</b> {repository.description}</li>
        ) : "";
        
        return (
            <div>
                <h1>GitHub Trending Repositories</h1>
                <ol>
                    {listItems}
                </ol>    
            </div>
        );
    }
}

function lastTimestamp(current, next) {
    if (!current || (current < next)) current = next;
    return current;
}

function getLastResultItems(state) {
    if (!state || !state.entities || !state.entities.results) return [];
    const results = state.entities.results;
    var key = Object.keys(results).reduce(lastTimestamp);
    const result = results[key];
    return result.items;
}

const RepoPageContainer = connect(
    (state) => ({
        repositories: denormalize(getLastResultItems(state), schemas.repositories, state.entities)
    }),
    (dispatch) => ({
        githubActions: bindActionCreators(githubActions, dispatch)
    }))(RepoPage);

export default RepoPageContainer;
