import hh from 'hyperscript-helpers';
import { curry } from 'ramda';
import { h } from 'virtual-dom';
const { div, i } = hh(h);

const Icon = curry((icon, { label, ...props }) =>
  div(
    { ariaHidden: true, ariaLabel: label || icon, ...props },
    i({ dataset: { feather: icon } })
  )
);

export const CancelIcon = Icon('x-circle');
export const CircleIcon = Icon('circle');
export const CheckedIcon = Icon('check-circle');
export const EditIcon = Icon('edit');
export const TrashIcon = Icon('trash-2');

export default Icon;
