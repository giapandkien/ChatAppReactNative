import firebaseApp from './firebase.config';

export const userRef = firebaseApp.firestore().collection('users');
export const storageRef = firebaseApp.storage().ref();
export const countryRef = firebaseApp.firestore().collection('countries');
export const cityRef = firebaseApp.firestore().collection('cities');
export const authRef = firebaseApp.auth();
