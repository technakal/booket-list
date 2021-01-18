import { curry } from 'ramda';

export const formOnChange = e => {
  const { target } = e;
  const { form, id, name, value, checked, validationMessage } = target;
  form.checkValidity();
  return { [id || name]: validationMessage };
};
