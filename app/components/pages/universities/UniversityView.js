import React, {Component, PropTypes} from 'react';
import {Grid, Col} from 'react-bootstrap';
import {Editors, WrapContainer, Loading} from '../../form/index';

export default class UniversityView extends Component {
    constructor() {
        super(...arguments)
    }

    render() {
        let {description, awaitStatuses, awaitErrors} = this.props;
        return (
            <WrapContainer animateIn="fadeIn">
                {awaitStatuses.getPost == 'pending' && <Loading text="Post is loading"/>}
                {awaitStatuses.getPost == 'success' &&
                <div className="post-view">
                    <div className="clearfix">
                        <div className="pull-left">
                            <h1 className="title">{post.title}</h1>
                            {
                            <div className="meta">
                                <ul>
                                    <li className="user"><i className="icon-user"/> {"post.user.first_name"}</li>
                                </ul>
                            </div>
                            }
                        </div>
                    </div>
                    <div className="content">
                        <Editors.EditorRich defaultContentState={post.content} readOnly={true}/>
                    </div>
                </div>
                }
                {awaitErrors.getPost &&
                <p>{awaitErrors.getPost}</p>
                }
            </WrapContainer>
        )
    }
}

UniversityView.propTypes = { 
    post: PropTypes.shape({
        user: PropTypes.object
    }),
    isAuthor: PropTypes.bool,
    awaitStatuses:PropTypes.shape({
        getPost: PropTypes.string
    }),
    awaitErrors:PropTypes.shape({
        getPost: PropTypes.string
    })
}
