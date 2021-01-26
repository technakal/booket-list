import Card from 'components/card/Card';
import CardRow from 'components/card/CardRow';
import InlineForm from 'components/forms/InlineForm';
import InputGroup from 'components/forms/InputGroup';
import { CancelIcon, EditIcon, TrashIcon } from 'components/Icon';
import { IconCheckboxWithLabel } from 'components/inputs/CheckboxInput';
import Input from 'components/inputs/Input';
import Label from 'components/Label';
import { log } from 'helpers/util';
import hh from 'hyperscript-helpers';
import { always, cond, equals, T, trim } from 'ramda';
import { h } from 'virtual-dom';

const { div, span } = hh(h);

const BookControls = ({
  className = '',
  id,
  isEdit,
  onedit,
  ondelete,
  ...props
}) =>
  div(
    {
      className: trim(
        `flex flex-row items-center justify-between w-full ${className}`
      ),
    },
    [
      TrashIcon({
        label: 'Delete Book',
        className: 'cursor-pointer mb-4 text-red-500',
        onclick: () => ondelete(id),
      }),
      cond([
        [
          equals(true),
          always(
            CancelIcon({
              label: 'Stop Editing Book',
              className: 'cursor-pointer mb-4 text-red-500',
              onclick: () => onedit('editId', null),
            })
          ),
        ],
        [
          T,
          always(
            EditIcon({
              label: 'Edit Book Details',
              className: 'cursor-pointer mb-4',
              onclick: () => onedit('editId', id),
            })
          ),
        ],
      ])(isEdit),
    ]
  );

const Book = ({
  errors,
  id,
  title,
  author,
  completed,
  isEdit = false,
  oncomplete,
  ondelete,
  onedit,
  onerror,
  onvalue,
  ...props
}) => {
  return Card(
    {
      className: 'bg-white flex flex-col max-w-md mb-2 w-96',
    },
    [
      BookControls({
        className: 'justify-self-start',
        id,
        isEdit,
        ondelete,
        onedit,
      }),
      cond([
        [
          equals(true),
          always(
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
                    inline: true,
                    type: 'text',
                    required: true,
                    onblur: e => {
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
                    inline: true,
                    type: 'text',
                    required: true,
                    onblur: e => {
                      form$({ ...form$(), [e.target.id]: e.target.value });
                      errors$({ ...errors$(), ...formOnChange(e) });
                    },
                  })
                ),
                CardRow(
                  { className: 'flex flex-row items-center mt-3 self-center' },
                  IconCheckboxWithLabel({
                    checked: completed,
                    checkedLabel: 'Read',
                    uncheckedLabel: 'Unread',
                    label: `Mark Book as ${completed ? 'Unread' : 'Read'}`,
                    form$,
                    id: `completed`,
                    type: 'checkbox',
                    onclick: () => {
                      oncomplete(id);
                    },
                  })
                ),
              ],
              ...props,
            })
          ),
        ],
        [
          T,
          always([
            CardRow(
              { className: 'select-none' },
              span({ className: 'font-bold' }, title)
            ),
            CardRow({ className: 'select-none' }, span(author)),
            CardRow(
              { className: 'flex flex-row items-center mt-3' },
              IconCheckboxWithLabel({
                checked: completed,
                checkedLabel: 'Read',
                uncheckedLabel: 'Unread',
                label: `Mark Book as ${completed ? 'Unread' : 'Read'}`,
                id: `completed`,
                type: 'checkbox',
                onclick: () => {
                  oncomplete(id);
                },
              })
            ),
          ]),
        ],
      ])(isEdit),
    ]
  );
};

export default Book;
