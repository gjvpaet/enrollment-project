import { keyBy, values } from 'lodash';

import {
    SET_BOOK,
    ADD_BOOK,
    UPDATE_BOOK,
    FETCH_BOOKS,
    DELETE_BOOK,
    SET_SELECTED_BOOK
} from '../actions/actionTypes';

let initialState = {
    data: {},
    selected: null,
    formAction: 'POST',
    formLoading: false,
    fetchLoading: true,
};

const bookReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BOOKS:
            return { ...state, fetchLoading: false, data: keyBy(action.payload, 'Id') };
        case SET_BOOK:
            return { ...state, ...action.payload };
        case ADD_BOOK:
            return { ...state, data: { [action.payload.Id]: action.payload, ...state.data }, selected: null };
        case UPDATE_BOOK:
            return { ...state, data: { ...state.data, [action.payload.Id]: action.payload }, selected: null };
        case DELETE_BOOK:
            let newBooks = values(state.data).filter(book => book.Id !== action.payload);

            return { ...state, data: keyBy(newBooks, 'Id') };
        case SET_SELECTED_BOOK:
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

export default bookReducer;