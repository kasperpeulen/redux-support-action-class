'use strict';

var _mocha = require('mocha');

var _chai = require('chai');

var _converter = require('./converter');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Action = function Action() {
  _classCallCheck(this, Action);

  this.type = this.constructor.name;
};

var CounterAction = function (_Action) {
  _inherits(CounterAction, _Action);

  function CounterAction() {
    _classCallCheck(this, CounterAction);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CounterAction).call(this));

    _this.type = "Counter." + _this.type;
    return _this;
  }

  return CounterAction;
}(Action);

var Increment = function (_CounterAction) {
  _inherits(Increment, _CounterAction);

  function Increment() {
    _classCallCheck(this, Increment);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Increment).call(this));
  }

  return Increment;
}(CounterAction);

var MyAction = function (_Action2) {
  _inherits(MyAction, _Action2);

  function MyAction() {
    _classCallCheck(this, MyAction);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(MyAction).apply(this, arguments));
  }

  return MyAction;
}(Action);

(0, _mocha.describe)("converter", function () {
  (0, _mocha.describe)("convertActionIntoObject", function () {
    (0, _mocha.it)("should convert an action into a plain object", function () {
      var action = new Increment();
      var plainObject = (0, _converter.convertActionIntoPlainObject)(action, Action);
      (0, _chai.expect)(plainObject).to.be.an('object');
    });

    (0, _mocha.it)("should not touch plain objects", function () {
      var object = (0, _converter.convertActionIntoPlainObject)({ plain: "object" }, Action);
      (0, _chai.expect)(object).to.equal(object);
    });
  });

  (0, _mocha.describe)("convertPlainObjectIntoAction", function () {
    (0, _mocha.it)("should convert a plain object into an action", function () {
      var object = {
        'type': 'MyAction'
      };
      var Actions = { MyAction: MyAction };
      var action = (0, _converter.convertPlainObjectIntoAction)(object, Actions);
      (0, _chai.expect)(action.type).to.equal(new MyAction().type);
    });

    (0, _mocha.it)("should convert a plain object into an action - deep", function () {
      var object = {
        'type': 'Counter.Increment'
      };
      var Actions = {
        Counter: {
          Increment: Increment
        }
      };
      var action = (0, _converter.convertPlainObjectIntoAction)(object, Actions);
      (0, _chai.expect)(action.type).to.equal(new Increment().type);
    });

    (0, _mocha.it)("should not touch objects not included in Actions object", function () {
      var Actions = {};
      var object = {
        'type': 'JUST_SOME_ACTION'
      };
      var action = (0, _converter.convertPlainObjectIntoAction)(object, Actions);
      (0, _chai.expect)(action).to.equal(object);
    });
  });
});