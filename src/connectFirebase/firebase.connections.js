import firebaseApp from './firebase.config';

export const userRef = firebaseApp.firestore().collection('users');
export const storageRef = firebaseApp.storage().ref();
export const countryRef = firebaseApp.firestore().collection('countries');
export const cityRef = firebaseApp.firestore().collection('cities');
export const chatRoomRef = firebaseApp.firestore().collection('chatRooms');
export const messageRef = firebaseApp.firestore().collection('messages');
export const statusesRef = firebaseApp.firestore().collection('statuses');
export const authRef = firebaseApp.auth();
