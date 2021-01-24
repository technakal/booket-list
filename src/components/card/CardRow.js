import hh from 'hyperscript-helpers';
import { trim } from 'ramda';
import { h } from 'virtual-dom';

const { div } = hh(h);

export default ({ className = '', ...props }, children) =>
  div(
    {
      className: trim(`text-xl font-medium text-black ${className}`),
    },
    children
  );
