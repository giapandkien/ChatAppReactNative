import {SET_AUTH} from '../types/auth.types';

export const setAuth = data => {
  return {
    type: SET_AUTH,
    payload: data,
  };
};
