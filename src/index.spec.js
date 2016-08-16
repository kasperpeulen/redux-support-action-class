import {Action, supportActionClassEnhancer,supportActionClassMiddleware} from '../index';
import {applyMiddleware, compose, createStore} from 'redux';

class Decrement extends Action {}

export const store = createStore(
  rootReducer,
  {},
  compose(
    supportActionClassEnhancer({Decrement}),
    applyMiddleware(supportActionClassMiddleware(Action))
  )
);

function rootReducer(state, action) {
  return state;
}

store.dispatch(new Decrement());
