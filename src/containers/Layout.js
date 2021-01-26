import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import { trim } from 'ramda';
const { div } = hh(h);

export default ({ className = '' }, children) =>
  div({ className: trim(`${className}`) }, children);
