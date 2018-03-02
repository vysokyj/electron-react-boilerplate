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
       
        const listItems = repositories ? Object.keys(repositories).map((key) =>
            <li key={key}><b>{repositories[key].name}</b> {repositories[key].description}</li>
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


const RepoPageContainer = connect(
    (state) => ({
        repositories: state.entities.repositories
    }),
    (dispatch) => ({
        githubActions: bindActionCreators(githubActions, dispatch)
    }))(RepoPage);

export default RepoPageContainer;
