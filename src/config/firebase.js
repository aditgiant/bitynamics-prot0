import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: 'AIzaSyDxKdjq3YAaG27xNc3iOVP8fl-sExytibc',
  authDomain: 'bitynamicsconsole-87cde.firebaseapp.com',
  databaseURL: 'https://bitynamicsconsole-87cde.firebaseio.com',
  projectId: 'bitynamicsconsole-87cde',
  storageBucket: 'bitynamicsconsole-87cde.appspot.com',
  messagingSenderId: '54196624636',
  appId: '1:54196624636:web:a06261a387b0c0325d0b79',
  measurementId: 'G-XM13YPQ22F',
};

export const myFirebase = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
