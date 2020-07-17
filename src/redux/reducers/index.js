import {combineReducers} from 'redux';
import authReducer from './auth';
import modelsReducer from './models';

export default combineReducers({
  auth: authReducer,
  models: modelsReducer,
});
