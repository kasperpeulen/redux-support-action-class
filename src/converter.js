export function convertActionIntoPlainObject(action, Action) {
  if (action instanceof Action) {
    return {...action};
  }
  return action;
}

export function convertPlainObjectIntoAction(object, Actions) {
  const type = object.type;
  const split = type.split('.');

  let constructor = Actions;

  split.forEach((s) => constructor = constructor[s]);

  if (typeof constructor === 'undefined') {
    return object;
  }

  const action = new constructor();

  Object.keys(object).forEach((key) => {
    action[key] = object[key];
  });

  return action;
}