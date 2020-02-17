import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';
import AuthReducer from '../reducers/auth.reducer';
import CreateProfileReducer from '../reducers/createProfile.reducer';
import CommonReducer from '../reducers/common.reducer';

const reducers = combineReducers({
  auth: AuthReducer,
  common: CommonReducer,
  createProfile: CreateProfileReducer,
});

export const initStore = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(thunkMiddleware)),
);
