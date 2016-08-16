import { describe, it } from "mocha";
import { expect } from 'chai';
import Action from './Action';

describe("Action", () => {

  it("Action is abstract", () => {
    expect(() => new Action()).to.throw(Error);
  });

  class Decrement extends Action {}

  it("Action subtype should have type of its constructor", () => {
    expect(new Decrement().type).to.equal("Decrement");
  });

  // abstract
  class CounterAction extends Action {}

  it("Action subtype with Action in name is abstract", () => {
    expect(() => new CounterAction()).to.throw(Error);
  });

  class Increment extends CounterAction {}

  it("Action subtype subtype should have type of its constructor " + "and its super constructor", () => {
    class Increment extends CounterAction {}
    expect(new Increment().type).to.equal('Counter.Increment');

    class ActionsModalAction extends Action {}

    class Toggle extends ActionsModalAction {}
    expect(new Toggle().type).to.equal('ActionsModal.Toggle');
  });
});