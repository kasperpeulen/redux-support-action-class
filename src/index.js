import {
  convertActionIntoPlainObject,
  convertPlainObjectIntoAction
} from './converter';

import Action from './Action';

/**
 * @param Action The class that all other actions should extend from.
 * Should have as type
 */
const supportActionClassMiddleware = Action => () => next => action =>
  next(convertActionIntoPlainObject(action, Action));

/**
 * The argument is an Object with all the Action that extend your ACtion class
 * the key is the name of the constructor
 */
const supportActionClassEnhancer = Actions => createStore => reducer =>
  createStore((state, action) =>
    reducer(state, convertPlainObjectIntoAction(action, Actions)));


export {Action, supportActionClassMiddleware, supportActionClassEnhancer};