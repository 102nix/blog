import React from 'react'
import { LoginForm } from '../../components/ui/LoginForm'
import { RegisterForm } from '../../components/ui/RegisterForm'
import { useParams } from 'react-router'
import './Auth.scss'

export const Auth = () => {

  const { type } = useParams()

  return (
    <>
      {type === 'register' ? (
        <RegisterForm />
      ) : (
        <LoginForm />
      )}
    </>
  )
}