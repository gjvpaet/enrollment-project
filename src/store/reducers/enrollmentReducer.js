import { keyBy, values } from 'lodash';

import {
    SET_ENROLLMENT,
    ADD_ENROLLMENT,
    UPDATE_ENROLLMENT,
    FETCH_ENROLLMENTS,
    DELETE_ENROLLMENT,
    SET_SELECTED_ENROLLMENT
} from '../actions/actionTypes';

let initialState = {
    data: {},
    selected: null,
    formAction: 'POST',
    formLoading: false,
    fetchLoading: true,
};

const enrollmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ENROLLMENTS:
            return { ...state, fetchLoading: false, data: keyBy(action.payload, 'Id') };
        case SET_ENROLLMENT:
            return { ...state, ...action.payload };
        case ADD_ENROLLMENT:
            return { ...state, data: { [action.payload.Id]: action.payload, ...state.data }, selected: null };
        case UPDATE_ENROLLMENT:
            return { ...state, data: { ...state.data, [action.payload.Id]: action.payload }, selected: null };
        case DELETE_ENROLLMENT:
            let newEnrollments = values(state.data).filter(enrollment => enrollment.Id !== action.payload);

            return { ...state, data: keyBy(newEnrollments, 'Id') };
        case SET_SELECTED_ENROLLMENT:
        let selected = state.selected ? { ...state.selected } : {};

        return {
            ...state,
            selected: {
                ...selected,
                [action.payload.field]: action.payload.value
            }
        };
        default:
            return state;
    }
};

export default enrollmentReducer;