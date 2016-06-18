import {
    RESULT_VIEW, UNIVERSITY_VIEW
} from '../actions/UniversityAction';
import update from 'react-addons-update';
import {createReducer} from 'redux-create-reducer';
import {postsList} from '../../configs/index';

const getInitialState = () => {
    return {
        lists: [],
        currentItems: postsList.perPage, //pagination
        currentUniversity: {
            user: {}
        },
        currentResult: {
            user: {}
        }
    }
}

export default createReducer(getInitialState(), {
    [RESULT_VIEW](state, action){
        return update(state, {
            currentResult: {$set: action.payload.getResultSummary}
        });
    },
    [UNIVERSITY_VIEW](state, action){
        return update(state, {
            currentUniversity: {$set: action.payload.getUniversityView}
        });
    }
});