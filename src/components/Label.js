import hh from 'hyperscript-helpers';
import { curry, trim } from 'ramda';
import { h } from 'virtual-dom';
const { label } = hh(h);

const Label = curry((children, { className = '', htmlFor, id, ...props }) =>
  label(
    {
      className: trim(`font-bold font-sans ${className}`),
      htmlFor: htmlFor || id,
      ...props,
    },
    children
  )
);

export default Label;
