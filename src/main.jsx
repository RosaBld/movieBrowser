import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { LoginSessionProvider } from './utilities/LogginProvider.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LoginSessionProvider>
        <App />
      </LoginSessionProvider>
    </BrowserRouter>
  </React.StrictMode>,
)