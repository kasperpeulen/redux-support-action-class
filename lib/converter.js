'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.convertActionIntoPlainObject = convertActionIntoPlainObject;
exports.convertPlainObjectIntoAction = convertPlainObjectIntoAction;
function convertActionIntoPlainObject(action, Action) {
  if (action instanceof Action) {
    return _extends({}, action);
  }
  return action;
}

function convertPlainObjectIntoAction(object, Actions) {
  var type = object.type;
  var split = type.split('.');

  var constructor = Actions;

  split.forEach(function (s) {
    return constructor = constructor[s];
  });

  if (typeof constructor === 'undefined') {
    return object;
  }

  var action = new constructor();

  Object.keys(object).forEach(function (key) {
    action[key] = object[key];
  });

  return action;
}