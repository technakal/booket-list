import { v4 as uuid } from 'uuid';

export const INITIAL_BOOK_FORM = {
  title: '',
  author: '',
  completed: false,
  errors: {},
};

export const initModel = {
  apiError: null,
  bookForm: INITIAL_BOOK_FORM,
  books: [
    {
      id: uuid(),
      title: 'The Satanic Verses',
      author: 'Salman Rushdie',
      completed: false,
    },
    {
      id: uuid(),
      title: 'The Old Man and the Sea',
      author: 'Ernest Hemingway',
      completed: true,
    },
    {
      id: uuid(),
      title: 'Paradise Lost',
      author: 'John Milton',
      completed: false,
    },
  ],
  editId: null,
  isLoading: false,
  viewAdd: false,
};
