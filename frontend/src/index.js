import React from "react";
import ReactDOM from 'react-dom/client';
import { ContextProvider } from "./contexts/ContextProvider";
import 'react-toastify/dist/ReactToastify.css';

import App from './App';
import './index.css';
import { AuthContextProvider } from "./contexts/AuthContext";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ContextProvider>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </ContextProvider>
);