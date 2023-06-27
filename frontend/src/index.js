import './assets/application.scss';
import './assets/index.css';

import { createRoot } from 'react-dom/client';

import init from './init.jsx';

const app = () => {
  const root = createRoot(document.getElementById('root'));
  root.render(init());
};

app();
