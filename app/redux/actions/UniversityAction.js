import {AWAIT_MARKER} from 'redux-await';
import PostApi from '../../api/post/index';

export const RESULT_VIEW = 'result view';

export function getResultSummary(id) {
    return (dispatch) => {
        dispatch({
            type: RESULT_VIEW,
            AWAIT_MARKER,
            payload: {
                getResultSummary: PostApi.getResultSummary(id)
            }
        })
    }
}
