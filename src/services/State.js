export const INITIAL_BOOK_FORM = {
  title: '',
  author: '',
  completed: false,
  errors: {},
};

export const initModel = {
  books: [
    {
      title: 'The Satanic Verses',
      author: 'Salman Rushdie',
      completed: false,
    },
    {
      title: 'The Old Man and the Sea',
      author: 'Ernest Hemingway',
      completed: true,
    },
    {
      title: 'Paradise Lost',
      author: 'John Milton',
      completed: false,
    },
  ],
  bookForm: INITIAL_BOOK_FORM,
  apiError: null,
};
