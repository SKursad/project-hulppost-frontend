import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from 'react-router-dom';
import AuthContextProvider from './context/auth-context';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <AuthContextProvider>
                <App/>
            </AuthContextProvider>
        </Router>
    </React.StrictMode>
);

reportWebVitals();
