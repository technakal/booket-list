import hh from 'hyperscript-helpers';
import { trim } from 'ramda';
import { h } from 'virtual-dom';

const { div, p } = hh(h);

const Book = (className = '') => ({ title, author, completed, ...props }) =>
  div(
    {
      className: trim(
        `border border-gray-300 bg-white flex flex-col content-center justify-center p-6 rounded-xl shadow-md space-x-4 ${className}`
      ),
    },
    [
      p(
        {
          className: 'text-xl font-medium text-black',
        },
        title
      ),
      p(
        {
          className: 'text-xl font-medium text-black',
        },
        author
      ),
      p(
        {
          className: 'text-xl font-medium text-black',
        },
        completed ? 'Finished' : 'Not Read'
      ),
    ]
  );

export default Book;
