import {SET_AUTH} from '../types/auth.types';

let initialState = {
  email: '',
  uid: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        uid: action.payload.uid,
        email: action.payload.email,
      };
    default:
      return state;
  }
};

export default authReducer;
