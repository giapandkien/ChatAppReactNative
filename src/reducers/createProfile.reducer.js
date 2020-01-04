import {UPDATE_INFO} from '../types/createProfile.types';

let initialState = {
  img: '',
  description: '',
};

const createProfileReducers = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_INFO:
      console.log(action.payload);
      return state;
    default:
      return state;
  }
};

export default createProfileReducers;
