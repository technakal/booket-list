import hh from 'hyperscript-helpers';
import { equals, map } from 'ramda';
import { h } from 'virtual-dom';
import Book from 'widgets/Book';
const { div } = hh(h);

export default ({
  books,
  deleteBook,
  editId,
  onerror,
  onvalue,
  toggleComplete,
  updateEditId,
  ...props
}) => {
  return div(
    {
      className: 'gap-3 grid grid-cols-1 lg:grid-cols-3',
    },
    map(
      b =>
        Book({
          isEdit: equals(editId, b.id),
          onedit: updateEditId,
          oncomplete: toggleComplete,
          ondelete: deleteBook,
          onerror,
          onvalue,
          ...b,
        }),
      books
    )
  );
};
