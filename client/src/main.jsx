import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.jsx'
import UserProvider from './contexts/UserProvider.jsx'
import './index.css'
import AuctionProvider from './contexts/AuctionProvider.jsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
     
      <AuctionProvider>
      <UserProvider>
        <App />
      </UserProvider>
      </AuctionProvider>
     
    </QueryClientProvider>
  </React.StrictMode>,
)
