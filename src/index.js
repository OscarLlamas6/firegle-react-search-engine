import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './global.css';
import { ResultContextProvider } from './contexts/ResultContextProvider';

// Importando componente <App />
import App from './App';

ReactDOM.render(
    <ResultContextProvider>
        <Router>
            <App />
        </Router>
    </ResultContextProvider>,
    document.getElementById('root'));