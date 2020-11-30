import * as types from './actionTypes'
import * as authorApi from "../../api/authorApi"

// actions
export function loadAuthorsSuccess(authors) {
    return { type: types.LOAD_AUTHORS_SUCCESS, authors }
}

// thunk
export const loadAuthors = () => dispatch => {
    return authorApi.getAuthors()
        .then(authors => dispatch(loadAuthorsSuccess(authors)))
        .catch(error => console.error('Error: ', error))
}
