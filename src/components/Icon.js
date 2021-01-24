import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import { curry } from 'ramda';
const { div, i } = hh(h);

const Icon = curry((icon, props) =>
  div({ ...props }, i({ dataset: { feather: icon } }))
);

export const CancelIcon = Icon('x');
export const EditIcon = Icon('edit');

export default Icon;
