import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './components/App.tsx'
import { Provider } from 'mobx-react';
import tableStore from './store/TableStore';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider tableStore = {tableStore}>
      <App />
    </Provider>
  </StrictMode>,
)
