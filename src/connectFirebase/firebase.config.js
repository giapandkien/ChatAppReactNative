import * as firebase from 'firebase';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC3UUpJ5elXIy0qmUjRUGaDKC3QLSCpr9Y',
  authDomain: 'chatapp-22591.firebaseapp.com',
  databaseURL: 'https://chatapp-22591.firebaseio.com',
  projectId: 'chatapp-22591',
  storageBucket: 'chatapp-22591.appspot.com',
  messagingSenderId: '963819271451',
  appId: '1:963819271451:web:cf7effcbdc1e014f13cfbe',
  measurementId: 'G-BEQ085QE6K',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;
