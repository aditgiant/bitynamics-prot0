import {fire, firestore} from '../../Fire';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const VERIFY_REQUEST = 'VERIFY_REQUEST';
export const VERIFY_SUCCESS = 'VERIFY_SUCCESS';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';

const requestLogin = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

const receiveLogin = (user) => {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
};

const loginError = () => {
  return {
    type: LOGIN_FAILURE,
  };
};

const requestLogout = () => {
  return {
    type: LOGOUT_REQUEST,
  };
};

const receiveLogout = (user) => {
  return {
    type: LOGOUT_SUCCESS,
    user,
  };
};

const logoutError = () => {
  return {
    type: LOGOUT_FAILURE,
  };
};

const verifyRequest = () => {
  return {
    type: VERIFY_REQUEST,
  };
};

const receiveVerify = () => {
  return {
    type: VERIFY_SUCCESS,
  };
};

export const loginUser = (credentials) => (dispatch) => {
  dispatch(requestLogin());
  fire
    .auth()
    .signInWithEmailAndPassword(credentials.email, credentials.password)
    .then((user) => {
      dispatch(receiveLogin(user));
    })
    .catch((err) => console.log(' error login'), dispatch(loginError()));
};

export const logoutUser = () => (dispatch) => {
  dispatch(requestLogout());
  fire
    .auth()
    .signOut()
    .then(() => {
      dispatch(receiveLogout());
    })
    .catch((err) => console.log(' error logout'), dispatch(logoutError()));
};

export const verifyAuth = () => (dispatch) => {
  dispatch(verifyRequest());
  fire.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      dispatch(receiveLogin(user));
    }
    dispatch(receiveVerify());
  });
};

export const signUp = (newUser) => (dispatch) => {
  fire
    .auth()
    .createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then((resp) => {
      return firestore.collection('users').doc(resp.user.uid).set({
        fullName: newUser.fullName,
        phoneNumber: newUser.phoneNumber,
        email: newUser.email,
      });
    })
    .then(() => {
      dispatch({type: 'SIGNUP_SUCCESS'});
    })
    .catch((err) => {
      dispatch({type: 'SIGNUP_ERR', err});
    });
};
