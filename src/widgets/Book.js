import Card from 'components/card/Card';
import CardRow from 'components/card/CardRow';
import InlineForm from 'components/forms/InlineForm';
import InputGroup from 'components/forms/InputGroup';
import Input from 'components/inputs/Input';
import CheckboxInput, { IconCheckbox } from 'components/inputs/CheckboxInput';
import Label from 'components/Label';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import { log } from 'helpers/util';
import { cond, always, T, equals } from 'ramda';
const { div, i, span } = hh(h);
import { EditIcon, CancelIcon } from 'components/Icon';

const Book = ({
  errors,
  id,
  title,
  author,
  completed,
  isEdit = false,
  onclick,
  oncomplete,
  onerror,
  onvalue,
  ...props
}) => {
  return Card(
    {
      className: 'mb-2',
    },
    [
      cond([
        [
          equals(true),
          always([
            div(
              {
                className:
                  'flex flex-row items-center justify-end text-red-500 w-full',
              },
              CancelIcon({
                className: 'cursor-pointer mb-4 float-right',
                onclick: () => onclick('editId', null),
              })
            ),
            InlineForm({
              initialForm: { id, title, author, completed },
              errors,
              onerror,
              onvalue,
              onsubmit: id => log('id')(id),
              inputs: ({ formOnChange, form$, errors$, ...props }) => [
                CardRow(
                  { className: 'flex flex-row items-center justify-between' },
                  InputGroup({
                    label: Label('Title'),
                    component: Input,
                    defaultValue: title,
                    errors,
                    form$,
                    id: 'title',
                    type: 'text',
                    required: true,
                    oninput: e => {
                      form$({ ...form$(), [e.target.id]: e.target.value });
                      errors$({ ...errors$(), ...formOnChange(e) });
                    },
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
                    id: `author`,
                    type: 'text',
                    required: true,
                    oninput: e => {
                      form$({ ...form$(), [e.target.id]: e.target.value });
                      errors$({ ...errors$(), ...formOnChange(e) });
                    },
                  })
                ),
                CardRow(
                  { className: 'mt-3 self-center' },
                  IconCheckbox(
                    {
                      checked: completed,
                      form$,
                      id: `completed`,
                      type: 'checkbox',
                      onclick: () => {
                        oncomplete(id);
                      },
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
            div(
              { className: 'flex flex-row items-center justify-end w-full' },
              EditIcon({
                className: 'cursor-pointer mb-4',
                onclick: () => onclick('editId', id),
              })
            ),
            CardRow({ className: 'select-none' }, span(title)),
            CardRow({ className: 'select-none' }, span(author)),
            CardRow(
              { className: 'mt-3' },
              IconCheckbox({
                checked: completed,
                id: `completed-${id}`,
                type: 'checkbox',
                onclick: e => oncomplete(id),
              })
            ),
          ]),
        ],
      ])(isEdit),
    ]
  );
};

export default Book;
