export default class Action {
  constructor() {
    const type = this.constructor.name;
    if (type === 'Action')
      throw new Error("Action is an abstract class." +
        "You shouldn't create an instance of it, but subclass it.");

    if (type.includes('Action')) {
      throw new Error("Subtypes of Action with Action in its name." +
        "Are treated as abstract classes. Don't create an instance.");
    }

    let supertype = this.__proto__.__proto__.constructor.name;

    if (supertype === 'Action') {
      this.type = type;
    } else if (supertype.includes('Action')) {
      supertype = supertype.substring(0, supertype.indexOf('Action'));
      this.type = supertype + "." + this.constructor.name;
    } else {
      throw new Error("HUUUUM I did not expect this.")
    }
  }

}

