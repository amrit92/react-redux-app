import {AWAIT_MARKER} from 'redux-await';
import UniversityApi from '../../api/university/index';

export const RESULT_VIEW = 'result view';
export const UNIVERSITY_VIEW = 'university view';

export function getResultSummary(id) {
    return (dispatch) => {
        dispatch({
            type: RESULT_VIEW,
            AWAIT_MARKER,
            payload: {
                getResultSummary: UniversityApi.getResultSummary(id)
            }
        })
    }
}

export function getUniversityView(id) {
    return (dispatch) => {
        dispatch({
            type: UNIVERSITY_VIEW,
            AWAIT_MARKER,
            payload: {
                getUniversityView: UniversityApi.getUniversity(id)
            }
        })
    }
}
