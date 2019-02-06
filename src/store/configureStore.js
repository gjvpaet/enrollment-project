import { routerReducer } from 'react-router-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import enrollmentReducer from './reducers/enrollmentReducer';

const rootReducer = combineReducers({
    enrollments: enrollmentReducer,
    router: routerReducer,
});

const configureStore = middleware => {
    return createStore(rootReducer, applyMiddleware(middleware));
};

export default configureStore;
