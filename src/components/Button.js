import hh from 'hyperscript-helpers';
import { trim } from 'ramda';
import { h } from 'virtual-dom';
const { button } = hh(h);

const Button = (
  {
    className = 'bg-gray-400 hover:bg-gray-300 hover:text-black',
    type = 'button',
    ...props
  },
  children
) =>
  button(
    {
      className: trim(
        `border-2 border-white p-2 pr-4 pl-4 rounded min-w-150 shadow text-white text-lg transition-colors ${className}`
      ),
      type,
      ...props,
    },
    children
  );

export const DefaultButton = ({ className = '', ...props }, children) =>
  Button(
    {
      className: trim(
        `bg-gray-400 hover:bg-gray-300 hover:text-black ${className}`
      ),
      ...props,
    },
    children || 'Default Label'
  );

export const SubmitButton = ({ className = '', ...props }, children) =>
  Button(
    {
      className: trim(`bg-blue-500 hover:bg-blue-400 ${className}`),
      type: 'submit',
      ...props,
    },
    children || 'Submit'
  );

export const CancelButton = (props, children) =>
  DefaultButton(props, children || 'Cancel');

export const DeleteButton = ({ className = '', ...props }, children) =>
  Button(
    { className: trim(`bg-red-500 hover:bg-red-400 ${className}`), ...props },
    children || 'Delete'
  );

export default Button;
