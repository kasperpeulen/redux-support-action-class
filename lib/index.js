'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.supportActionClassEnhancer = exports.supportActionClassMiddleware = exports.Action = undefined;

var _converter = require('./converter');

var _Action = require('./Action');

var _Action2 = _interopRequireDefault(_Action);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param Action The class that all other actions should extend from.
 * Should have as type
 */
var supportActionClassMiddleware = function supportActionClassMiddleware(Action) {
  return function () {
    return function (next) {
      return function (action) {
        return next((0, _converter.convertActionIntoPlainObject)(action, Action));
      };
    };
  };
};

/**
 * The argument is an Object with all the Action that extend your ACtion class
 * the key is the name of the constructor
 */
var supportActionClassEnhancer = function supportActionClassEnhancer(Actions) {
  return function (createStore) {
    return function (reducer) {
      return createStore(function (state, action) {
        return reducer(state, (0, _converter.convertPlainObjectIntoAction)(action, Actions));
      });
    };
  };
};

exports.Action = _Action2.default;
exports.supportActionClassMiddleware = supportActionClassMiddleware;
exports.supportActionClassEnhancer = supportActionClassEnhancer;