import { path, pipe, prop } from 'ramda';

export const books = prop('books');
export const bookForm = path(['bookForm']);
export const title = pipe(bookForm, prop('title'));
export const author = pipe(bookForm, prop('author'));
export const completed = pipe(bookForm, prop('completed'));
export const bookFormErrors = path(['bookForm', 'errors']);
