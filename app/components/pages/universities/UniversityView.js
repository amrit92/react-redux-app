import React, {Component, PropTypes} from 'react';
import {Grid, Col} from 'react-bootstrap';
import {Editors, WrapContainer, Loading} from '../../form/index';

export default class UniversityView extends Component {
    constructor() {
        super(...arguments)
    }

    render() {        
        let {university, isAuthor, awaitStatuses, awaitErrors} = this.props;
        return (
            <WrapContainer animateIn="fadeIn">
                {awaitStatuses.getUniversityView == 'pending' && <Loading text=""/>}
                {awaitStatuses.getUniversityView == 'success' && 

                <div className="post-view">
                    <div className="clearfix">
                        <div className="pull-left">
                            <h1 className="title">{university.name}</h1>
                        </div>
                        {isAuthor &&
                            <a href={`#/university/edit/${university.id}`} className="btn btn-sm pull-right btn-red"><i className="icon-pencil"/> Edit</a>
                        }
                    </div>
                    <div className="content">
                        {"university.content"}
                    </div>
                </div>
                }
                {awaitErrors.getUniversityView &&
                <p>{awaitErrors.getUniversityView}</p>
                }
            </WrapContainer>
        )
    }
}

UniversityView.propTypes = {
    university: PropTypes.shape({
        user: PropTypes.object
    }),
    isAuthor: PropTypes.bool,
    awaitStatuses:PropTypes.shape({
        getUniversityView: PropTypes.string
    }),
    awaitErrors:PropTypes.shape({
        getUniversityView: PropTypes.string
    })
}
