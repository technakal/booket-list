import Label from 'components/Label';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import Input from './Input';

const { div } = hh(h);

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
