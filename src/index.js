import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

window.addEventListener('error', e => {
    if (e.message === 'ResizeObserver loop completed with undelivered notifications.' || e.message === 'ResizeObserver loop limit exceeded') {
        const resizeObserverErrDiv = document.getElementById(
            'webpack-dev-server-client-overlay-div'
        );
        const resizeObserverErr = document.getElementById(
            'webpack-dev-server-client-overlay'
        );
        if (resizeObserverErr) {
            resizeObserverErr.setAttribute('style', 'display: none');
        }
        if (resizeObserverErrDiv) {
            resizeObserverErrDiv.setAttribute('style', 'display: none');
        }   
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

