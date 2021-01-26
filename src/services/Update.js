import {
  author,
  bookForm,
  bookFormErrors,
  books,
  completed,
  title,
} from 'helpers/props';
import {
  always,
  concat,
  cond,
  curry,
  filter,
  map,
  not,
  pipe,
  propEq,
  T,
} from 'ramda';
import httpFactory from 'services/http.factory';
import { INITIAL_BOOK_FORM } from 'services/State';
import { v4 as uuid } from 'uuid';
const propTypeEq = propEq('type');

const http = httpFactory();

const MSGS = {
  ADD_BOOK: 'ADD_BOOK',
  COMPLETE_BOOK: 'COMPLETE_BOOK',
  DELETE_BOOK: 'DELETE_BOOK',
  UPDATE_BOOK: 'UPDATE_BOOK',
  UPDATE_FORM: 'UPDATE_FORM',
  UPDATE_FORM_ERROR: 'UPDATE_FORM_ERROR',
  UPDATE_PROP: 'UPDATE_PROP',
};

export const addBookMsg = () => ({
  type: MSGS.ADD_BOOK,
});

export const deleteBookMsg = id => ({
  type: MSGS.DELETE_BOOK,
  id,
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

const update = (msg, _m) =>
  cond([
    [
      propTypeEq(MSGS.ADD_BOOK),
      () => {
        const newBook = {
          id: uuid(),
          title: title(_m),
          author: author(_m),
          completed: completed(_m),
        };
        return [
          {
            ..._m,
            bookForm: INITIAL_BOOK_FORM,
            books: concat(books(_m), [newBook]),
            viewAdd: false,
          },
          () => http.post('/books', newBook),
        ];
      },
    ],
    [
      propTypeEq(MSGS.COMPLETE_BOOK),
      () => {
        const updatedBook = books(_m).find(propEq('id', msg.id));
        updatedBook.completed = !updatedBook.completed;
        return [
          {
            ..._m,
            books: map(
              b => (propEq('id', b.id)(msg) ? updatedBook : b),
              books(_m)
            ),
          },
          () => http.put(`/books/${msg.id}`, updatedBook),
        ];
      },
    ],
    [
      propTypeEq(MSGS.DELETE_BOOK),
      always([
        {
          ..._m,
          books: filter(b => pipe(propEq('id', b.id), not)(msg), books(_m)),
        },
        () => http.delete(`/books/${msg.id}`),
      ]),
    ],
    [
      propTypeEq(MSGS.UPDATE_BOOK),
      () => {
        const { id, title, author, completed } = msg;
        const updatedBooks = map(
          b =>
            propEq('id', b.id)(msg)
              ? {
                  ...b,
                  title,
                  author,
                  completed,
                }
              : b,
          books(_m)
        );
        return [
          {
            ..._m,
            books: updatedBooks,
          },
          () => http.put(`/books/${id}`, { id, title, author, completed }),
        ];
      },
    ],
    [
      propTypeEq(MSGS.UPDATE_FORM),
      always([
        {
          ..._m,
          bookForm: {
            ...bookForm(_m),
            ...msg.update,
          },
        },
      ]),
    ],
    [
      propTypeEq(MSGS.UPDATE_FORM_ERROR),
      always([
        {
          ..._m,
          bookForm: {
            ...bookForm(_m),
            errors: {
              ...bookFormErrors(_m),
              ...msg.value,
            },
          },
        },
      ]),
    ],
    [propTypeEq(MSGS.UPDATE_PROP), always([{ ..._m, ...msg.update }])],
    [T, always([_m])],
  ])(msg);

export default update;
