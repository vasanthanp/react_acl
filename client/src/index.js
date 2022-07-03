import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './app/App';
import { AuthProvider, AuthReducer, initialState } from './app/context/AuthContext';
import './index.css'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthProvider
      initialState={
        localStorage.getItem('user')
          ? { user: JSON.parse(localStorage.getItem('user')) }
          :
          initialState
      }
      AuthReducer={AuthReducer}
    >
    <Routes>
     <Route path='/*' element = {<App />} />
    </Routes>
    </AuthProvider>
  </BrowserRouter>
);

