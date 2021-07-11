import { combineReducers } from 'redux';

import user from './user';
// import socket from './socket';

const rootReducer = combineReducers({
    user
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;