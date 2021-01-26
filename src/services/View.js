import { DefaultButton } from 'components/Button';
import Error from 'components/Error';
import Bookshelf from 'containers/Bookshelf';
import Layout from 'containers/Layout';
import { bookForm } from 'helpers/props';
import { isValue } from 'helpers/util';
import { always, cond, curry, pipe, prop, propEq, T } from 'ramda';
import {
  addBookMsg,
  deleteBookMsg,
  toggleCompleteBookMsg,
  updateBookMsg,
  updateFormErrorMsg,
  updateFormMsg,
  updatePropMsg,
} from 'services/Update';
import BookForm from 'widgets/BookForm';

const showForm = curry((_d, val) => pipe(updatePropMsg('viewAdd'), _d)(val));
const hasError = pipe(prop('apiError'), isValue);

const view = (_d, model) =>
  Layout({ className: 'flex flex-col items-center justify-between pb-10' }, [
    hasError(model) ? Error(model.apiError) : null,
    cond([
      [
        propEq('viewAdd', true),
        always(
          BookForm({
            _d,
            initialForm: model.form,
            model: bookForm(model),
            errors: model.bookForm.errors,
            onerror: pipe(updateFormErrorMsg, _d),
            oncancel: () => showForm(_d, false),
            onvalue: pipe(updateFormMsg, _d),
            onsubmit: pipe(addBookMsg, _d),
          })
        ),
      ],
      [
        T,
        always(
          DefaultButton(
            {
              className: 'bg-green-600 hover:bg-green-400 mb-6',
              onclick: () => {
                showForm(_d, true);
              },
            },
            'Add Book'
          )
        ),
      ],
    ])(model),
    Bookshelf({
      books: model.books,
      deleteBook: pipe(deleteBookMsg, _d),
      editId: model.editId,
      onerror: pipe(updateFormErrorMsg, _d),
      onvalue: pipe(updateBookMsg, _d),
      toggleComplete: pipe(toggleCompleteBookMsg, _d),
      updateEditId: (key, val) => _d(updatePropMsg(key, val)),
    }),
  ]);

export default view;
