import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import CreateProfileReducer from '../reducers/createProfile.reducer';
import {composeWithDevTools} from 'redux-devtools-extension';

const reducers = combineReducers({
  CreateProfile: CreateProfileReducer,
});

export const initStore = createStore(
  reducers,
  {},
  composeWithDevTools(...applyMiddleware(thunkMiddleware)),
);
