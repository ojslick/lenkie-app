import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { App } from './App';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import * as Sentry from '@sentry/react';

Sentry.init({
    dsn: 'https://6af28235b12f13bbb37eafcc44441a8f@o4505948904947712.ingest.sentry.io/4505948907110405',
    integrations: [
        new Sentry.BrowserTracing({
            tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
        }),
        new Sentry.Replay(),
    ],

    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
