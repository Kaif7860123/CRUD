import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AdminLogin from './pages/login/index.jsx'
import CrudApp from './pages/adminDashboard/index.jsx'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import UserPage from './pages/userDashboard/index.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<UserPage/>}/>
    <Route path="/admin_login" element={<AdminLogin/>}/>
    <Route path="/admin_dash" element={<ProtectedRoute>
      <CrudApp/>
    </ProtectedRoute>}/>
   </Routes>
   </BrowserRouter>
  </StrictMode>,
)
