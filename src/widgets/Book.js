import Card from 'components/card/Card';
import CardRow from 'components/card/CardRow';
import InlineForm from 'components/forms/InlineForm';
import InputGroup from 'components/forms/InputGroup';
import Input from 'components/inputs/Input';
import CheckboxInput from 'components/inputs/CheckboxInput';
import Label from 'components/Label';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import { log } from 'helpers/util';
import { cond, always, T, equals } from 'ramda';
const { div, i, span } = hh(h);
import { EditIcon, CancelIcon } from 'components/Icon';

const Book = (className = '') => ({
  errors,
  id,
  title,
  author,
  completed,
  isEdit = false,
  ...props
}) =>
  Card(
    {
      className: 'mb-2',
    },
    [
      cond([
        [
          equals(true),
          always([
            CancelIcon({
              className: 'cursor-pointer',
              onclick: () => console.log('set card to view'),
            }),
            InlineForm({
              initialForm: {},
              errors: [],
              onsubmit: id => log('id')(id),
              inputs: ({ formOnChange, form$, errors$, onblur }) => [
                CardRow(
                  { className: 'flex flex-row items-center justify-between' },
                  InputGroup({
                    label: Label('Title'),
                    component: Input,
                    defaultValue: title,
                    errors,
                    form$,
                    id: `title-${id}`,
                    type: 'text',
                    required: true,
                    oninput: e => {
                      form$({ ...form$(), [e.target.id]: e.target.value });
                      errors$({ ...errors$(), ...formOnChange(e) });
                    },
                    onblur,
                  })
                ),
                CardRow(
                  { className: 'flex flex-row items-center justify-between' },
                  InputGroup({
                    label: Label('Author'),
                    component: Input,
                    defaultValue: author,
                    errors,
                    form$,
                    id: `author-${id}`,
                    type: 'text',
                    required: true,
                    oninput: e => {
                      form$({ ...form$(), [e.target.id]: e.target.value });
                      errors$({ ...errors$(), ...formOnChange(e) });
                    },
                    onblur,
                  })
                ),
                CardRow(
                  { className: 'mt-3' },
                  CheckboxInput(
                    {
                      defaultChecked: completed,
                      id: `completed-${id}`,
                      type: 'checkbox',
                      oninput: e => {
                        form$({ ...form$(), [e.target.id]: e.target.value });
                      },
                      onblur,
                    },
                    'Completed'
                  )
                ),
              ],
              ...props,
            }),
          ]),
        ],
        [
          T,
          always([
            EditIcon({
              className: 'cursor-pointer',
              onclick: () => console.log('set card to edit'),
            }),
            CardRow({}, span(title)),
            CardRow({}, span(author)),
            CardRow({}, span(completed ? 'Finished' : 'Not Finished')),
          ]),
        ],
      ])(isEdit),
    ]
  );

export default Book;
