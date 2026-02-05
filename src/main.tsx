import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './features/auth/AuthContext';
import { UIProvider } from './features/shared/UIContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <UIProvider>
            <AuthProvider>
                <App />
            </AuthProvider>
        </UIProvider>
    </React.StrictMode>
);
