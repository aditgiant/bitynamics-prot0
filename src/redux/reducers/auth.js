import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  VERIFY_REQUEST,
  VERIFY_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
} from '../actions/auth';

export default (state = {}, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        isLoggingIn: true,
        loginError: false,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: true,
        user: action.user,
      };
    }
    case LOGIN_FAILURE: {
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: false,
        loginError: true,
      };
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        isLoggingOut: true,
        logoutError: false,
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        isLogginOut: false,
        isAuthenticated: false,
        user: {},
      };
    }
    case LOGOUT_FAILURE: {
      return {
        ...state,
        isLoggingOut: false,
        logoutError: true,
      };
    }
    case VERIFY_REQUEST: {
      return {
        ...state,
        isVerifying: true,
      };
    }
    case VERIFY_SUCCESS: {
      return {
        ...state,
        isVerifying: false,
      };
    }
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        authError: false,
      };
    }
    case SIGNUP_ERROR: {
      return {
        ...state,
        authError: action.err.message,
      };
    }

    default:
      return state;
  }
};
