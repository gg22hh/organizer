import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { BrowserRouter } from 'react-router-dom'
import 'dayjs/locale/en-gb';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
        <App />
      </LocalizationProvider>
    </BrowserRouter>
  </React.StrictMode>
);
