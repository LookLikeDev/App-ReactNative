import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';

export const appName = 'look-like-dev';
export const firebaseConfig = {
  apiKey: 'AIzaSyArx87BbUlmDBnEAsw77it4k74KX1gKYcs',
  authDomain: 'look-like-dev.firebaseapp.com',
  databaseURL: 'https://look-like-dev.firebaseio.com',
  projectId: 'look-like-dev',
  storageBucket: 'look-like-dev.appspot.com',
  messagingSenderId: '306895689483',
  timestampsInSnapshots: true,
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
firestore.settings({ timestampsInSnapshots: true });
