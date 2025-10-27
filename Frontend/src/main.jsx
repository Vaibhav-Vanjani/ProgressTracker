import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import TrackerContextProvider from './Context/ProgressTrackerContext.jsx';
import {BrowserRouter} from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <BrowserRouter>
      <TrackerContextProvider>
          <App />
      </TrackerContextProvider>
    </BrowserRouter>
  // </StrictMode>,
)
