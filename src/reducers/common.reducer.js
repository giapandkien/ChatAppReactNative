import {SET_LOADING_FULL, SET_LOADING_DIALOG} from '../types/common.types';

let initialState = {
  loadingFull: false,
  loadingDialog: false,
};

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING_FULL:
      return {
        ...state,
        loadingFull: !state.loadingFull,
      };
    case SET_LOADING_DIALOG:
      return {
        ...state,
        loadingDialog: !state.loadingDialog,
      };
    default:
      return state;
  }
};

export default commonReducer;
