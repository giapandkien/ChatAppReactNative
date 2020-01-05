import {UPDATE_INFO, SET_DEFAULT} from '../types/createProfile.types';

let initialState = {
  sex: 'male',
  img: '',
  age: '',
  description: '',
  listCountry: [],
  listCity: [],
  countrySelected: '',
  citySelected: '',
};

const createProfileReducers = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_INFO:
      return {
        ...state,
        [action.payload.type]: action.payload.value,
      };
    case SET_DEFAULT:
      return {
        sex: 'male',
        img: '',
        age: '',
        description: '',
        listCountry: [],
        listCity: [],
        countrySelected: '',
        citySelected: '',
      };
    default:
      return state;
  }
};

export default createProfileReducers;
