import {SET_LOADING_FULL, SET_LOADING_DIALOG} from '../types/common.types';

export const setLoadingFull = () => {
  return {
    type: SET_LOADING_FULL,
  };
};

export const setLoadingDialog = () => {
  return {
    type: SET_LOADING_DIALOG,
  };
};
