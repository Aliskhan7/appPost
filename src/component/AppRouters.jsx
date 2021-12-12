import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import About from '../pages/About'
import Posts from '../pages/Posts'
import Error from '../pages/Error'
import PostIdPage from '../pages/PostIdPage'
import { privateRoutes, publicRoutes } from '../router'
import Login from '../pages/Login'
import { AuthContext } from './context'
import Loader from 'react-loader-spinner'

function AppRouters (props) {
  const {isAuth} = useContext(AuthContext);
  const {isLoader} = useContext(AuthContext);

  if(isLoader){
    return <Loader/>
  }
  return (
     isAuth
        ? <Routes>
        {privateRoutes.map(rout =>{
          return(
            <Route
              path={rout.path}
              element={<rout.element/>}
              exact={rout.exact}
              key={rout.path}
            />
          )
        })}
        {publicRoutes.map(rout =>{
          return(
            <Route
              path={rout.path}
              element={<rout.element/>}
              exact={rout.exact}
              key={rout.path}
            />
          )
        })}
        <Route path='/error' element={<Error/>}></Route>
      </Routes>
        :
      <Routes>
        {publicRoutes.map(rout =>{
          console.log(rout)
          return(
            <Route path={rout.path} element={<rout.element/>} exact={rout.exact} />
          )
        })}
        <Route path='*' element={<Login/>}></Route>

      </Routes>

  )
}

export default AppRouters