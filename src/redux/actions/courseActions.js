import * as types from './actionTypes'
import * as courseApi from "../../api/courseApi"

// actions
export function loadCoursesSuccess(courses) {
    return { type: types.LOAD_COARSES_SUCCESS, courses}
}

export function updateCourseSuccess(course) {
    return { type: types.UPDATE_COURSE_SUCCESS, course}
}

export function createCourseSuccess(course) {
    return { type: types.CREATE_COURSE_SUCCESS, course}
}

// thunk
export function loadCourses() {
    return function(dispatch) {
        return courseApi.getCourses()
            .then(courses => dispatch(loadCoursesSuccess(courses)))
            .catch(error => { throw error })
    }
}

export const saveCourse = (course) => dispatch => courseApi
    .saveCourse(course)
    .then(savedCourse => {
        course.id 
            ? dispatch(updateCourseSuccess(savedCourse))
            : dispatch(createCourseSuccess(savedCourse))
    })
    .catch(error => { throw error })