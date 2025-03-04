import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Profile from './pages/Profile'


createRoot(document.getElementById('root')).render(
 <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/loged' element={<Profile />} />
      </Routes>
    </BrowserRouter>
 </StrictMode>
)
