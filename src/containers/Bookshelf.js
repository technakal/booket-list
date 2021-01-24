import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import Book from 'widgets/Book';
import { equals, map } from 'ramda';
const { div, p } = hh(h);

export default ({
  books,
  editId,
  onerror,
  onvalue,
  toggleComplete,
  updateEditId,
  ...props
}) => {
  return div(
    {
      className: 'flex flex-col max-w-md w-3/6',
    },
    map(
      b =>
        Book({
          onclick: updateEditId,
          oncomplete: toggleComplete,
          onerror,
          onvalue,
          isEdit: equals(editId, b.id),
          ...b,
        }),
      books
    )
  );
};
