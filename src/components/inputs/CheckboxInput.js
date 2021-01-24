import { CheckedIcon, CircleIcon } from 'components/Icon';
import Label from 'components/Label';
import hh from 'hyperscript-helpers';
import { always, cond, propEq, T } from 'ramda';
import { h } from 'virtual-dom';
import Input from './Input';

const { div } = hh(h);

export const IconCheckbox = props =>
  cond([
    [
      propEq('checked', true),
      always(CheckedIcon({ className: 'text-green-600', ...props })),
    ],
    [T, always(CircleIcon({ className: 'text-gray-400', ...props }))],
  ])(props);

export default ({ id, ...props }, children) =>
  div({ className: 'flex content-center' }, [
    Input({
      className: 'form-checkbox h-5 w-5 text-gray-600',
      id,
      type: 'checkbox',
      ...props,
    }),
    Label(children, { className: 'ml-4 select-none text-base', id }),
  ]);
