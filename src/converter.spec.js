import {describe, it} from "mocha";
import {expect} from 'chai';
import {convertActionIntoPlainObject, convertPlainObjectIntoAction} from './converter';

class Action {
  constructor() {
    this.type = this.constructor.name;
  }
}

class CounterAction extends Action {
  constructor()  {
    super();
    this.type = "Counter." + this.type;
  }
}
class Increment extends CounterAction {
  constructor() {
    super();
  }
}

class MyAction extends Action {}

describe("converter", () => {
  describe("convertActionIntoObject", () => {
    it("should convert an action into a plain object", () => {
      const action = new Increment();
      const plainObject = convertActionIntoPlainObject(action, Action);
      expect(plainObject).to.be.an('object');
    });

    it("should not touch plain objects", () => {
      const object = convertActionIntoPlainObject({plain: "object"}, Action);
      expect(object).to.equal(object);
    });
  });

  describe("convertPlainObjectIntoAction", () => {
    it("should convert a plain object into an action", () => {
      const object = {
        'type' : 'MyAction'
      };
      const Actions = {MyAction};
      const action = convertPlainObjectIntoAction(object, Actions);
      expect(action.type).to.equal(new MyAction().type);
    });

    it("should convert a plain object into an action - deep", () => {
      const object = {
        'type' : 'Counter.Increment'
      };
      const Actions = {
        Counter : {
          Increment
        }
      };
      const action = convertPlainObjectIntoAction(object, Actions);
      expect(action.type).to.equal(new Increment().type);
    });

    it("should not touch objects not included in Actions object", () => {
      const Actions = {};
      const object = {
        'type' : 'JUST_SOME_ACTION'
      };
      const action = convertPlainObjectIntoAction(object, Actions);
      expect(action).to.equal(object);
    });

  });
});
