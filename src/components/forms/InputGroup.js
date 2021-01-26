import Error from 'components/Error';
import { isValue } from 'helpers/util';
import hh from 'hyperscript-helpers';
import { always, cond, equals, pipe, prop, T } from 'ramda';
import { h } from 'virtual-dom';

const { div } = hh(h);

const hasError = id => pipe(prop(id), isValue);

export default ({ id, label, component, errors, ...props }) =>
  div({ className: 'flex flex-col w-full' }, [
    label ? label({ className: 'text-gray-500 text-sm', htmlFor: id }) : null,
    component({ className: 'p-1 w-full', id, ...props }),
    hasError(id)(errors) ? Error(prop(id, errors)) : null,
  ]);
