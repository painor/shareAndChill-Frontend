import { combineReducers } from 'redux';

// Reducers
import messageReducer from './message-reducer';

// Combine Reducers
const reducers = combineReducers({
    messageState: messageReducer,
});

export default reducers;
