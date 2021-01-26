export const formOnChange = e => {
  const { target } = e;
  const { form, id, name, validationMessage } = target;
  form.checkValidity();
  return { [id || name]: validationMessage };
};
