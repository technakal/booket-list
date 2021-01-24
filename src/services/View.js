import { DefaultButton } from 'components/Button';
import Bookshelf from 'containers/Bookshelf';
import { bookForm } from 'helpers/props';
import hh from 'hyperscript-helpers';
import { always, cond, curry, pipe, propEq, T } from 'ramda';
import {
  addBookMsg,
  toggleCompleteBookMsg,
  updateBookMsg,
  updateFormErrorMsg,
  updateFormMsg,
  updatePropMsg,
} from 'services/Update';
import { h } from 'virtual-dom';
import BookForm from 'widgets/BookForm';

const { div, pre } = hh(h);

const showForm = curry((_d, val) => pipe(updatePropMsg('viewAdd'), _d)(val));

const view = (_d, model) =>
  div({ className: 'flex flex-col items-center justify-between' }, [
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
              className: 'mb-6',
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
      editId: model.editId,
      onerror: pipe(updateFormErrorMsg, _d),
      onvalue: pipe(updateBookMsg, _d),
      toggleComplete: pipe(toggleCompleteBookMsg, _d),
      updateEditId: (key, val) => _d(updatePropMsg(key, val)),
    }),
    pre({}, JSON.stringify(model, null, 2)),
  ]);

export default view;
