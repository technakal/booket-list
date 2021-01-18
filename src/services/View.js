import { bookForm } from 'helpers/props';
import hh from 'hyperscript-helpers';
import { pipe } from 'ramda';
import { addBookMsg, updateFormErrorMsg, updateFormMsg } from 'services/Update';
import { h } from 'virtual-dom';
import BookForm from 'widgets/BookForm';

const { div, pre } = hh(h);

const view = (_d, model) =>
  div({}, [
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
    // div(
    //   {
    //     className:
    //       'gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-6 place-content-stretch',
    //   },
    //   map(Book(), model.books)
    // ),
    pre({}, JSON.stringify(model, null, 2)),
  ]);

export default view;
