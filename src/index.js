import { initModel } from 'services/State';
import update from 'services/Update';
import view from 'services/View';
import 'tailwindcss/tailwind.css';
import app from './App';

const node = document.querySelector('#app');

app(initModel, update, view, node);
