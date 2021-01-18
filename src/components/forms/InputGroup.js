import Error from 'components/Error';
import { isValue } from 'helpers/util';
import { pipe, prop } from 'ramda';

const hasError = id => pipe(prop(id), isValue);

export default ({ id, label, component, errors, ...props }) => [
  label({ htmlFor: id }),
  component({ id, ...props }),
  hasError(id)(errors) ? Error(prop(id, errors)) : null,
];
