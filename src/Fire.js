import firebase from 'firebase';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBwvWAOUN3VuZIWgJxeNYAOxLVtVqCB16w',
  authDomain: 'bitynamics.firebaseapp.com',
  databaseURL: 'https://bitynamics.firebaseio.com',
  projectId: 'bitynamics',
  storageBucket: 'bitynamics.appspot.com',
  messagingSenderId: '121550425769',
  appId: '1:121550425769:web:ac1c92252183bb4c5fe3b8',
  measurementId: 'G-JERYEPR2V3',
};

export const fire = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export {fire as default};
