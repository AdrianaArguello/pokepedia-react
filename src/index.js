import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import About from './pages/about';
import './index.css';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFoundPage from './pages/notfoundpage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<App />} />
          <Route path="/about/:id" element={<About />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
