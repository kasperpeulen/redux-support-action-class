(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("redux-support-action-class", [], factory);
	else if(typeof exports === 'object')
		exports["redux-support-action-class"] = factory();
	else
		root["redux-support-action-class"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.supportActionClassEnhancer = exports.supportActionClassMiddleware = exports.Action = undefined;

	var _converter = __webpack_require__(1);

	var _Action = __webpack_require__(2);

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

/***/ },
/* 1 */
/***/ function(module, exports) {

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

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Action = function Action() {
	  _classCallCheck(this, Action);

	  var type = this.constructor.name;
	  if (type === 'Action') throw new Error("Action is an abstract class." + "You shouldn't create an instance of it, but subclass it.");

	  if (type.includes('Action')) {
	    throw new Error("Subtypes of Action with Action in its name." + "Are treated as abstract classes. Don't create an instance.");
	  }

	  var supertype = this.__proto__.__proto__.constructor.name;

	  if (supertype === 'Action') {
	    this.type = type;
	  } else if (supertype.includes('Action')) {
	    supertype = supertype.substring(0, supertype.indexOf('Action'));
	    this.type = supertype + "." + this.constructor.name;
	  } else {
	    throw new Error("HUUUUM I did not expect this.");
	  }
	};

	exports.default = Action;

/***/ }
/******/ ])
});
;