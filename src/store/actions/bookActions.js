import {
    SET_BOOK,
    ADD_BOOK,
    UPDATE_BOOK,
    FETCH_BOOKS,
    DELETE_BOOK,
    SET_SELECTED_BOOK
} from './actionTypes';

export const fetchBooks = payload => {
    return {
        payload,
        type: FETCH_BOOKS
    };
};

export const setSelectedBook = payload => {
    return {
        payload,
        type: SET_SELECTED_BOOK
    };
};

export const setBook = payload => {
    return {
        payload,
        type: SET_BOOK
    };
};

export const addBook = payload => {
    return {
        payload,
        type: ADD_BOOK
    };
};

export const updateBook = payload => {
    return {
        payload,
        type: UPDATE_BOOK
    };
};

export const deleteBook = payload => {
    return {
        payload,
        type: DELETE_BOOK
    };
};