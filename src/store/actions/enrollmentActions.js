import {
    SET_ENROLLMENT,
    ADD_ENROLLMENT,
    UPDATE_ENROLLMENT,
    FETCH_ENROLLMENTS,
    DELETE_ENROLLMENT,
    SET_SELECTED_ENROLLMENT
} from './actionTypes';

export const fetchEnrollments = payload => {
    return {
        payload,
        type: FETCH_ENROLLMENTS
    };
};

export const setSelectedEnrollment = payload => {
    return {
        payload,
        type: SET_SELECTED_ENROLLMENT
    };
};

export const setEnrollment = payload => {
    return {
        payload,
        type: SET_ENROLLMENT
    };
};

export const addEnrollment = payload => {
    return {
        payload,
        type: ADD_ENROLLMENT
    };
};

export const updateEnrollment = payload => {
    return {
        payload,
        type: UPDATE_ENROLLMENT
    };
};

export const deleteEnrollment = payload => {
    return {
        payload,
        type: DELETE_ENROLLMENT
    };
};