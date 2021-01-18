import hh from 'hyperscript-helpers';
import { trim } from 'ramda';
import { h } from 'virtual-dom';
const { input } = hh(h);

const Input = ({ className = '', id, oninput, type = 'text', ...props }) =>
  input({
    className: trim(
      `border border-gray-400 mb-3 p-2 pl-3 pr-3 rounded-md ${className}`
    ),
    id,
    name: id,
    oninput,
    type,
    ...props,
  });

export default Input;
