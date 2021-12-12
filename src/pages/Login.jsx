import React, { useContext } from 'react'
import MyInput from '../component/UI/Input/MyInput'
import MyButton from '../component/UI/Button/MyButton'
import { AuthContext } from '../component/context'

function Login (props) {
  const {isAuth, setIsAuth} = useContext(AuthContext);


  const login = (e) =>{
    e.preventDefault();
    setIsAuth(true)
    localStorage.setItem('auth', 'true')
  }
  return (
    <div>
      <h1>Страница логина</h1>
      <form onSubmit={login}>
        <MyInput type='text' placeholder='Логин'/>
        <MyInput type='password' placeholder='Пароль'/>
        <MyButton>Войти</MyButton>
      </form>
    </div>
  )
}

export default Login