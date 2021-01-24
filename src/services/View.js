import Book from 'widgets/Book';
import { bookForm } from 'helpers/props';
import hh from 'hyperscript-helpers';
import { map, pipe } from 'ramda';
import { addBookMsg, updateFormErrorMsg, updateFormMsg } from 'services/Update';
import { h } from 'virtual-dom';
import BookForm from 'widgets/BookForm';

const { div, pre } = hh(h);

const view = (_d, model) =>
  div({ className: 'flex flex-col items-center justify-between' }, [
    BookForm({
      _d,
      initialForm: model.form,
      model: bookForm(model),
      errors: model.bookForm.errors,
      onerror: pipe(updateFormErrorMsg, _d),
      oncancel: console.log,
      onvalue: pipe(updateFormMsg, _d),
      onsubmit: pipe(addBookMsg, _d),
    }),
    div(
      {
        className: 'flex flex-col max-w-md w-3/6',
      },
      map(Book(), model.books)
    ),
    pre({}, JSON.stringify(model, null, 2)),
  ]);

export default view;
