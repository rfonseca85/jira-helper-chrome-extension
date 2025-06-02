import React from 'react';
import { createRoot } from 'react-dom/client';
import Popup from './popup.jsx';

const root = document.getElementById('popup-root');
if (root) {
  createRoot(root).render(<Popup />);
}
