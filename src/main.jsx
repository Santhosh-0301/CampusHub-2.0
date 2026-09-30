import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

/**
 * main.jsx – React entry point.
 * Uses HashRouter so that client-side routes work correctly
 * when deployed to GitHub Pages (which doesn't support HTML5
 * history-based routing without server configuration).
 *
 * With HashRouter, URLs look like:
 *   https://santhosh-0301.github.io/CampusHub/#/dashboard
 * instead of:
 *   https://santhosh-0301.github.io/CampusHub/dashboard
 *
 * This prevents 404 errors on page refresh under GitHub Pages.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
