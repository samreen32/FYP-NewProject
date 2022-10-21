import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers';


//combine all the reducers in one place
const rootReducer = combineReducers({userReducer});  //as we have one funct so as passing it in combineReducers.

export const store = createStore(rootReducer, applyMiddleware(thunk));
