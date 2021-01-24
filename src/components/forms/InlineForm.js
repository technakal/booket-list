import flyd from 'flyd';
import hh from 'hyperscript-helpers';
import { formOnChange } from 'services/form.on.change';
import { h } from 'virtual-dom';
const { form } = hh(h);

export default (
  { _d, initialForm = {}, inputs, onerror, onvalue, onsubmit, ...props },
  children
) => {
  const form$ = flyd.stream();
  const errors$ = flyd.stream();

  flyd.on(onvalue, form$);
  flyd.on(onerror, errors$);

  const onblur = e => {
    e.preventDefault();
    const { target } = e;
    const { id, name, value } = target;
    onsubmit(id, value);
  };

  return form(
    {
      className:
        'container flex flex-col content-center justify-evenly max-w-md mx-auto',
      form$,
      props,
    },
    [inputs({ formOnChange, form$, errors$, onblur }), children]
  );
};