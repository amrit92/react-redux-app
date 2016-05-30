import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {setTitle, reduxAwait} from '../../../utils/index';
import {UniversityView, UniversityResult} from '../../../components/pages/universities/index';
import {resetCurrentPost} from '../../actions/PostAction';
import {getResultSummary} from '../../actions/UniversityAction';

class UniversityViewContainer extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            isAuthor: false
        }
    }

    componentWillUnmount() {
        this.props.resetCurrentPost();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.university_id != nextProps.university_id) {
            this.props.getResultSummary(nextProps.university_id);
        }
    }

    componentDidUpdate() {
        if (this.props.university.uid == this.props.uid && !this.state.isAuthor && this.props.university.uid) {
            this.setState({isAuthor: true});
        }
        if (this.props.university.title) {
            setTitle(this.props.university.title);
        }
    }

    componentDidMount() {
        this.props.getResultSummary(this.props.university_id);
    }

    render() {
        return (
            <div>
                <UniversityView {...this.props} isAuthor={this.state.isAuthor}/>
                <UniversityResult {...this.props} isAuthor={this.state.isAuthor}/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps)=> {
    return {
        uid: state.auth.authenticated.user.uid,
        university: state.results.currentUniversity,
        university_id: ownProps.params.id
    }
}

const mapDispatchToProps = (dispatch)=> {
    return bindActionCreators({getResultSummary, resetCurrentPost}, dispatch);
}

export default reduxAwait.connect(mapStateToProps, mapDispatchToProps)(UniversityViewContainer);
