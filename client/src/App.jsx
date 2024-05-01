import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import AppLayout from './ui/AppLayout'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import AuctionItemPage from './pages/AuctionItemPage'
import { Toaster }from 'react-hot-toast'
import CreateAuctionPage from './pages/CreateAuctionPage';
import UserProfilePage from './pages/UserProfilePage'

function App() {
  
  return (
   <>
    <ReactQueryDevtools initialIsOpen={ false} />
      <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
        <Route index element={<Navigate replace to='home'/>} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/auction/:auctionId' element={ <AuctionItemPage/>} />
        <Route path='/auction/create' element={<CreateAuctionPage />} />
        <Route path='/user' element={ <UserProfilePage/>} />
        </Route>
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </BrowserRouter>

      <Toaster
        position='top-center'
        gutter={12}
        containerStyle={{ margin: '8px', marginTop: '140px' }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: '18px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: 'violet',
            color: 'white',
          }
        }}
      />
  </>
    )}
  
export default App
