import React, {Component, PropTypes} from 'react';
import {Grid, Col} from 'react-bootstrap';
import {Editors, WrapContainer, Loading} from '../../form/index';
import ReactTypeahead from 'react-typeahead';
import CustomTypeaheadList from '../../CustomTypeaheadList'
import Autosuggest from 'react-autosuggest';
import { getSuggestions, getSuggestionValue, renderSuggestion } from '../../helpers/AutosuggestHelper';
import autosuggestTheme from '../../../stylesheets/_autosuggest.scss';
import { hashHistory } from 'react-router'


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
