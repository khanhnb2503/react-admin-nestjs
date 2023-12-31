import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/styles.scss';
import './style.css';
import { App } from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
