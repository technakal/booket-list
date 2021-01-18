import {
  and,
  converge,
  curry,
  equals,
  isEmpty,
  isNil,
  not,
  pipe,
  type,
} from 'ramda';

export const isValue = converge(and, [pipe(isNil, not), pipe(isEmpty, not)]);
export const typeEq = t => pipe(type, equals(t));
export const typeEqArray = typeEq('Array');
export const log = curry((l, v) => {
  console.log(l, v);
  return v;
});
