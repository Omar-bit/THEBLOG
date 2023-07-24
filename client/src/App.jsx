import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Blog from './pages/Blogg'
import Register from './pages/Register'
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/*' element={<> 404 page not found</>} />
      </Routes>
    </>
  )
}

export default App
