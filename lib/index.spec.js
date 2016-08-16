'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = undefined;

var _index = require('../index');

var _redux = require('redux');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Decrement = function (_Action) {
  _inherits(Decrement, _Action);

  function Decrement() {
    _classCallCheck(this, Decrement);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Decrement).apply(this, arguments));
  }

  return Decrement;
}(_index.Action);

var store = exports.store = (0, _redux.createStore)(rootReducer, {}, (0, _redux.compose)((0, _index.supportActionClassEnhancer)({ Decrement: Decrement }), (0, _redux.applyMiddleware)((0, _index.supportActionClassMiddleware)(_index.Action))));

function rootReducer(state, action) {
  return state;
}

store.dispatch(new Decrement());