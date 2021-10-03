/**
 * vueEmitter that will emit to a destination
 *   
 
 Say we would like to `Submit` an event from child to grandfather [child_1,parent_0,grandfather]
 There are three options:

 0 - emit and then emit again till you get there, or god-forbid use an event bus. OR use this with two options:

 1 - Set condition = 1 , by the time it will get to the parent, 
    the condition's value will be zero and emit to his parent (grandfather)

 2 - Set the condition to 'grandfather' , it will stop at the parent and emit

    
  Number:  if you have fix number of parents, but don't know their names, e.g. it's a shared component and the parent name is unknown. 
          Caution - it will break if we put another wrapper between.

  String (name) :  if you have a fixed name.

 Note: we always needs to stop one step earlier so the destination will catch the emit.

 * @param {object} ctx - `this`
 * @param {string} context Event name
 * @param {any} value Value to emit
 * @param {string | number} condition - destination, a component name or number of parents
 * @returns The destination ctx
 */

export const vueEmitter = (ctx, context, value, condition = 1) => {
  let vm = ctx.$parent;

  while (vm) {
    if (
      vm?.$parent?.$options?.name === condition || // String
      (typeof condition !== 'string' && !(condition && condition--)) // Number
    ) {
      vm.$emit(context, value);

      break;
    }

    vm = vm.$parent;
  }

  return vm;
};
