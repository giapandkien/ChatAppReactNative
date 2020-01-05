import {UPDATE_INFO, SET_DEFAULT} from '../types/createProfile.types';

export const updateInfo = data => {
  return {
    type: UPDATE_INFO,
    payload: data,
  };
};

export const setDefault = () => {
  return {
    type: SET_DEFAULT,
  };
};
