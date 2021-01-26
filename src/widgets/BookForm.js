import Form from 'components/forms/Form';
import InputGroup from 'components/forms/InputGroup';
import CheckboxInput from 'components/inputs/CheckboxInput';
import Input from 'components/inputs/Input';
import Label from 'components/Label';

export default ({ initialForm, errors, model, oncancel, onsubmit, ...props }) =>
  Form({
    initialForm,
    errors,
    submitProps: {
      onclick: onsubmit,
      label: 'Add Book',
    },
    cancelProps: {
      onclick: oncancel,
      label: 'Cancel',
    },
    inputs: ({ formOnChange, form$, errors$ }) => [
      InputGroup({
        label: Label('Title'),
        component: Input,
        defaultValue: model.title,
        errors,
        form$,
        id: 'title',
        type: 'text',
        required: true,
        oninput: e => {
          form$({ ...form$(), [e.target.id]: e.target.value });
          errors$({ ...errors$(), ...formOnChange(e) });
        },
      }),
      InputGroup({
        label: Label('Author'),
        component: Input,
        defaultValue: model.author,
        errors,
        form$,
        id: 'author',
        type: 'text',
        required: true,
        oninput: e => {
          form$({ ...form$(), [e.target.id]: e.target.value });
          errors$({ ...errors$(), ...formOnChange(e) });
        },
      }),
      CheckboxInput(
        {
          form$,
          defaultChecked: model.completed,
          id: 'completed',
          type: 'checkbox',
          oninput: e => form$({ ...form$(), [e.target.id]: e.target.checked }),
        },
        'Completed'
      ),
    ],
    ...props,
  });
