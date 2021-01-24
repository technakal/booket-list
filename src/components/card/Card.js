import hh from 'hyperscript-helpers';
import { trim } from 'ramda';
import { h } from 'virtual-dom';

const { div } = hh(h);

export default ({ className = '', ...props }, children) =>
  div(
    {
      className: trim(
        `border border-gray-300 bg-white flex flex-col items-center justify-center p-6 rounded-xl shadow-md ${className}`
      ),
    },
    children
  );
