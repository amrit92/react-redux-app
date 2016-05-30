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
        if (this.props.post_id != nextProps.post_id) {
            this.props.getResultSummary(nextProps.post_id);
        }
    }

    componentDidUpdate() {
        if (this.props.post.uid == this.props.uid && !this.state.isAuthor && this.props.post.uid) {
            this.setState({isAuthor: true});
        }
        if (this.props.post.title) {
            setTitle(this.props.post.title);
        }
    }

    componentDidMount() {
        this.props.getResultSummary(this.props.post_id);
    }

    render() {
        return (
            <div>
                <UniversityResult {...this.props} isAuthor={this.state.isAuthor}/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps)=> {
    return {
        uid: state.auth.authenticated.user.uid,
        post: state.posts.currentPost,
        post_id: ownProps.params.id
    }
}

const mapDispatchToProps = (dispatch)=> {
    return bindActionCreators({getResultSummary, resetCurrentPost}, dispatch);
}

export default reduxAwait.connect(mapStateToProps, mapDispatchToProps)(UniversityViewContainer);
