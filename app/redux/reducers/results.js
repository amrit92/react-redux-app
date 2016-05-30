import {
    RESULT_VIEW
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
        }
    }
}

export default createReducer(getInitialState(), {
    [RESULT_VIEW](state, action){
        return update(state, {
            currentUniversity: {$set: action.payload.getResultSummary}
        });
    }
});