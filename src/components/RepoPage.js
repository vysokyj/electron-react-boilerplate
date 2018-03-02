import React, { PureComponent } from "react";
import * as githubActions from "../actions/github";
import * as uiActions from "../actions/ui";
import * as schemas from "../schemas";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {denormalize} from "normalizr";

class RepoPage extends PureComponent {

    componentWillMount() {
        this.props.githubActions.getRepositories(this.props.selectedCompouterLanguage);
    }

    onChange(event) {
        const language = event.target.value;
        this.props.uiActions.selectComputerLanguage(language);
        this.props.githubActions.getRepositories(language);
    }

    render() {
        const {compouterLanguages, selectedCompouterLanguage, repositories} = this.props;
        
        const options = compouterLanguages.map((compouterLanguage) => 
            <option key={compouterLanguage} value={compouterLanguage}>{compouterLanguage}</option>
        );
        
        const listItems = repositories ? repositories.map((repository) =>
            <li key={repository.id}><b>{repository.owner.login}/{repository.name}</b> {repository.description}</li>
        ) : "";
        
        return (
            <div>
                <h1>GitHub Trending Repositories</h1>
                <p>Computer language: <select onChange={(e) => this.onChange(e)} value={selectedCompouterLanguage}>{options}</select></p>
                <ol>{listItems}</ol>    
            </div>
        );
    }
}

function lastTimestamp(current, next) {
    return (!current || (current < next)) ? next : current;
}

function getLastResultItems(state) {
    if (!state || !state.entities || !state.entities.results) return [];
    const results = state.entities.results;
    var key = Object.keys(results).reduce(lastTimestamp);
    const result = results[key];
    return result.items;
}

function mapStateToProps(state) {
    return { 
        compouterLanguages: state.ui.compouterLanguages,
        selectedCompouterLanguage: state.ui.selectedCompouterLanguage,
        repositories: denormalize(getLastResultItems(state), schemas.repositories, state.entities)
    };
}
  
function mapDispatchToProps(dispatch) {
    return {   
        uiActions: bindActionCreators(uiActions, dispatch),
        githubActions: bindActionCreators(githubActions, dispatch)
    };    
}  

const RepoPageContainer = connect(mapStateToProps,mapDispatchToProps)(RepoPage);

export default RepoPageContainer;
