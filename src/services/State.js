export const INITIAL_BOOK_FORM = {
  title: '',
  author: '',
  completed: false,
  errors: {},
};

export const initModel = {
  apiError: null,
  bookForm: INITIAL_BOOK_FORM,
  books: [],
  editId: null,
  isLoading: false,
  viewAdd: false,
};
