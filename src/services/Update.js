import {
  author,
  bookForm,
  bookFormErrors,
  books,
  completed,
  title,
} from 'helpers/props';
import { always, concat, cond, curry, map, propEq, T } from 'ramda';
const propTypeEq = propEq('type');
import { INITIAL_BOOK_FORM } from 'services/State';

const MSGS = {
  ADD_BOOK: 'ADD_BOOK',
  UPDATE_BOOK: 'UPDATE_BOOK',
  UPDATE_FORM: 'UPDATE_FORM',
  UPDATE_FORM_ERROR: 'UPDATE_FORM_ERROR',
  UPDATE_PROP: 'UPDATE_PROP',
};

export const addBookMsg = () => ({
  type: MSGS.ADD_BOOK,
});

export const updateFormMsg = update => ({
  type: MSGS.UPDATE_FORM,
  update,
});

export const updateFormErrorMsg = value => ({
  type: MSGS.UPDATE_FORM_ERROR,
  value,
});

export const updatePropMsg = curry((key, value) => ({
  type: MSGS.UPDATE_PROP,
  update: { [key]: value },
}));

export const updateLoadingMsg = updatePropMsg('isLoading');

const update = (msg, _m) => {
  console.log(msg);
  return cond([
    [
      propTypeEq(MSGS.ADD_BOOK),
      always({
        ..._m,
        bookForm: INITIAL_BOOK_FORM,
        books: concat(books(_m), [
          { title: title(_m), author: author(_m), completed: completed(_m) },
        ]),
      }),
    ],
    [
      propTypeEq(MSGS.UPDATE_BOOK),
      always({
        ..._m,
        books: map(b =>
          propEq('id', b.id)(msg)
            ? {
                ...b,
                title: 'New Title',
                author: 'New Author',
                completed: true,
              }
            : b
        ),
      }),
    ],
    [
      propTypeEq(MSGS.UPDATE_FORM),
      always({
        ..._m,
        bookForm: {
          ..._m.bookForm,
          ...msg.update,
        },
      }),
    ],
    [
      propTypeEq(MSGS.UPDATE_FORM_ERROR),
      always({
        ..._m,
        bookForm: {
          ...bookForm(_m),
          errors: {
            ...bookFormErrors(_m),
            ...msg.value,
          },
        },
      }),
    ],
    [propTypeEq(MSGS.UPDATE_PROP), always({ ..._m, ...msg.update })],
    [T, always(_m)],
  ])(msg);
};

export default update;
