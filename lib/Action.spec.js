'use strict';

var _mocha = require('mocha');

var _chai = require('chai');

var _Action4 = require('./Action');

var _Action5 = _interopRequireDefault(_Action4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(0, _mocha.describe)("Action", function () {

  (0, _mocha.it)("Action is abstract", function () {
    (0, _chai.expect)(function () {
      return new _Action5.default();
    }).to.throw(Error);
  });

  var Decrement = function (_Action) {
    _inherits(Decrement, _Action);

    function Decrement() {
      _classCallCheck(this, Decrement);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Decrement).apply(this, arguments));
    }

    return Decrement;
  }(_Action5.default);

  (0, _mocha.it)("Action subtype should have type of its constructor", function () {
    (0, _chai.expect)(new Decrement().type).to.equal("Decrement");
  });

  // abstract

  var CounterAction = function (_Action2) {
    _inherits(CounterAction, _Action2);

    function CounterAction() {
      _classCallCheck(this, CounterAction);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(CounterAction).apply(this, arguments));
    }

    return CounterAction;
  }(_Action5.default);

  (0, _mocha.it)("Action subtype with Action in name is abstract", function () {
    (0, _chai.expect)(function () {
      return new CounterAction();
    }).to.throw(Error);
  });

  var Increment = function (_CounterAction) {
    _inherits(Increment, _CounterAction);

    function Increment() {
      _classCallCheck(this, Increment);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Increment).apply(this, arguments));
    }

    return Increment;
  }(CounterAction);

  (0, _mocha.it)("Action subtype subtype should have type of its constructor " + "and its super constructor", function () {
    var Increment = function (_CounterAction2) {
      _inherits(Increment, _CounterAction2);

      function Increment() {
        _classCallCheck(this, Increment);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Increment).apply(this, arguments));
      }

      return Increment;
    }(CounterAction);

    (0, _chai.expect)(new Increment().type).to.equal('Counter.Increment');

    var ActionsModalAction = function (_Action3) {
      _inherits(ActionsModalAction, _Action3);

      function ActionsModalAction() {
        _classCallCheck(this, ActionsModalAction);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ActionsModalAction).apply(this, arguments));
      }

      return ActionsModalAction;
    }(_Action5.default);

    var Toggle = function (_ActionsModalAction) {
      _inherits(Toggle, _ActionsModalAction);

      function Toggle() {
        _classCallCheck(this, Toggle);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Toggle).apply(this, arguments));
      }

      return Toggle;
    }(ActionsModalAction);

    (0, _chai.expect)(new Toggle().type).to.equal('ActionsModal.Toggle');
  });
});