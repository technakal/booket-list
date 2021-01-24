import { CancelButton, DefaultButton, SubmitButton } from 'components/Button';
import flyd from 'flyd';
import hh from 'hyperscript-helpers';
import { isNil, not, pipe, prop, trim, identity } from 'ramda';
import { formOnChange } from 'services/form.on.change';
import { h } from 'virtual-dom';
const { div, form } = hh(h);

const FormButtons = ({
  className = '',
  submitProps,
  cancelProps,
  otherActionProps,
  ...props
}) =>
  div({ className: trim(`flex ${className}`), ...props }, [
    SubmitButton(
      { className: 'flex-grow', ...submitProps },
      prop('label', submitProps)
    ),
    pipe(isNil, not)(otherActionProps)
      ? DefaultButton(
          { className: 'flex-grow', ...otherActionProps },
          prop('label', otherActionProps)
        )
      : null,
    CancelButton(
      { className: 'flex-grow', ...cancelProps },
      prop('label', cancelProps)
    ),
  ]);

const Form = (
  {
    cancelProps,
    _d,
    initialForm = {},
    inputs,
    onerror,
    onvalue,
    otherActionProps,
    submitProps,
    ...props
  },
  children
) => {
  const form$ = flyd.stream();
  const errors$ = flyd.stream();

  flyd.on(onvalue, form$);
  flyd.on(onerror, errors$);

  const onSubmit = e => {
    e.preventDefault();
    const { target } = e;
    const { form } = target;
    submitProps.onclick();
    form.reset();
  };

  const onCancel = e => {
    e.preventDefault();
    cancelProps.onclick(e);
  };

  const onOther = e => {
    e.preventDefault();
    otherActionProps.onclick(e);
  };

  return form(
    {
      className:
        'container flex flex-col content-center justify-evenly max-w-md mb-10 mx-auto',
      form$,
      props,
    },
    [
      inputs({ formOnChange, form$, errors$ }),
      children,
      FormButtons({
        className: 'mt-4',
        submitProps: { ...submitProps, onclick: onSubmit },
        otherActionProps: otherActionProps
          ? { ...otherActionProps, onclick: onOther }
          : null,
        cancelProps: { ...cancelProps, onclick: onCancel },
      }),
    ]
  );
};

export default Form;
