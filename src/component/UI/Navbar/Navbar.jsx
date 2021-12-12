import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import MyButton from '../Button/MyButton'
import { AuthContext } from '../../context'

function Navbar (props) {
  const {isAuth, setIsAuth} = useContext(AuthContext)

  const logout = () =>{
    setIsAuth(false)
    localStorage.removeItem('auth')
  }
  return (
    <div className='navbar'>
      <MyButton onClick={logout}>
        Выйти
      </MyButton>
      <Link to='/about'>О нас </Link>
      <Link to='/posts'>Посты</Link>
    </div>
  )
}

export default Navbar