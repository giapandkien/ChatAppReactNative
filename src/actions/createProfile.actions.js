import {UPDATE_INFO} from '../types/createProfile.types';

export const updateInfoAction = data => {
  return {
    type: UPDATE_INFO,
    payload: data,
  };
};
