import React from 'react'
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom'
import Register from './pages/Register'
import Home from './pages/Home'
import ProtectedRoutes from './components/ProtectedRoutes'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegistorAndLogout() {
  localStorage.clear()
  return <Register />
  
}
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={
          <ProtectedRoutes>
            <Home/>
          </ProtectedRoutes>} />
          <Route path='/login' element={<Login/>}/>
        <Route path='/logout' element={<Logout/>}/>
        <Route path='/register' element={<RegistorAndLogout/>}/>
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App