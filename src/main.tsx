import { createRoot } from 'react-dom/client';

import { App } from './app/index.tsx';

import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
