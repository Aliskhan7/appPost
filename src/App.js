import React, { useEffect, useState } from 'react'
import About from './pages/About'
import Posts from './pages/Posts'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './component/UI/Navbar/Navbar'
import Error from './pages/Error'
import AppRouters from './component/AppRouters'
import {AuthContext} from '../src/component/context/index'

function App (props) {
  const [isAuth, setIsAuth] = useState(false)
  const [isLoader, setIsLoader] = useState(true)

  useEffect(() =>{
    if(localStorage.getItem('auth')){
      setIsAuth(true)
    }
    setIsLoader(false)

  }, [])
  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth,
      setIsLoader
    }}>
      <div>
        <Navbar/>
        <AppRouters/>
      </div>
    </AuthContext.Provider>

  )
}

export default App