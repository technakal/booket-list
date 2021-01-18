import { isValue, typeEqArray } from 'helpers/util';
import hh from 'hyperscript-helpers';
import { always, cond, map, T } from 'ramda';
import { h } from 'virtual-dom';

const { p } = hh(h);

const ErrorMessage = m =>
  p(
    {
      className: 'font-bold max-w-md mb-5 text-red-600',
    },
    m
  );

export default (message = []) =>
  cond([
    [typeEqArray, always(map(ErrorMessage, message))],
    [isValue, always(ErrorMessage(message))],
    [T, always(null)],
  ])(message);
