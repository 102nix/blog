import React from 'react'
import { LoginForm } from '../../components/ui/LoginForm'
import { RegisterForm } from '../../components/ui/RegisterForm'
import { useParams } from 'react-router'
import { NavLink } from 'react-router-dom'
import './Auth.scss'

export const Auth = () => {
  const { type } = useParams()

  return (
    <div className="auth">
      {type === 'register' ? (
        <>
          <h2>Регистрация</h2>
          <RegisterForm />
          <div className="form-links">
            <NavLink to='/auth/login' className='link-reg'>Есть логин?</NavLink>
          </div>
        </>
      ) : (
        <>
          <h2>Вход</h2>
          <LoginForm />
          <div className="form-links">
            <NavLink to='/auth/register' className='link-auth'>Нет логина?</NavLink>
          </div>
        </>
      )}
    </div>
  )
}