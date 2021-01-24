import {
  author,
  bookForm,
  bookFormErrors,
  books,
  completed,
  title,
} from 'helpers/props';
import { always, concat, cond, curry, map, propEq, T } from 'ramda';
import { INITIAL_BOOK_FORM } from 'services/State';
import { v4 as uuid } from 'uuid';
const propTypeEq = propEq('type');

const MSGS = {
  ADD_BOOK: 'ADD_BOOK',
  COMPLETE_BOOK: 'COMPLETE_BOOK',
  UPDATE_BOOK: 'UPDATE_BOOK',
  UPDATE_FORM: 'UPDATE_FORM',
  UPDATE_FORM_ERROR: 'UPDATE_FORM_ERROR',
  UPDATE_PROP: 'UPDATE_PROP',
};

export const addBookMsg = () => ({
  type: MSGS.ADD_BOOK,
});

export const toggleCompleteBookMsg = id => ({
  type: MSGS.COMPLETE_BOOK,
  id,
});

export const updateBookMsg = ({ id, title, author, completed }) => ({
  type: MSGS.UPDATE_BOOK,
  id,
  title,
  author,
  completed,
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
          {
            id: uuid(),
            title: title(_m),
            author: author(_m),
            completed: completed(_m),
          },
        ]),
      }),
    ],
    [
      propTypeEq(MSGS.COMPLETE_BOOK),
      always({
        ..._m,
        books: map(
          b =>
            propEq('id', b.id)(msg)
              ? {
                  ...b,
                  completed: !b.completed,
                }
              : b,
          books(_m)
        ),
      }),
    ],
    [
      propTypeEq(MSGS.UPDATE_BOOK),
      () => {
        return {
          ..._m,
          books: map(
            b =>
              propEq('id', b.id)(msg)
                ? {
                    ...b,
                    title: msg.title,
                    author: msg.author,
                    completed: msg.completed,
                  }
                : b,
            books(_m)
          ),
        };
      },
    ],
    [
      propTypeEq(MSGS.UPDATE_FORM),
      always({
        ..._m,
        bookForm: {
          ...bookForm(_m),
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
