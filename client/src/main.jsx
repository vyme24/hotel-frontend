import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import "./index.css"
import App from './App.jsx';
import { store } from './store/index.js';
import { ModalProvider } from './hooks/ModalContext.jsx';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <ModalProvider>
        <App />
      </ModalProvider>
    </BrowserRouter>
  </Provider>
);
