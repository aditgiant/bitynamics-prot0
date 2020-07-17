import {applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {verifyAuth} from './actions/auth';
import {fetchModel} from './actions/models';
import rootReducer from './reducers';

export default function configureStore(persistedState) {
  const store = createStore(
    rootReducer,
    persistedState,
    applyMiddleware(thunkMiddleware)
  );
  store.dispatch(verifyAuth());
  store.dispatch(fetchModel());

  return store;
}
