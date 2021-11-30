import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { setTokens } from '../services/localStorage.service'

const httpAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/',
  params: {
    key: process.env.REACT_APP_FIREBASE_KET
  }
})
const AuthContext = React.createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}
export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null)
  const [isAuth, setIsAuth] = useState(JSON.parse(localStorage.getItem('login')) || false)

  function login () {
    setIsAuth(true)
  }
  function logout () {
    setIsAuth(false)
    localStorage.setItem('login', false)
  }
  async function signUp ({ email, password }) {
    try {
      const { data } = await httpAuth.post('accounts:signUp', { email, password, returnSecureToken: true })
      setTokens(data)
      console.log(data)
    } catch (error) {
      errorCatcher(error)
      const { code, message } = error.response.data.error
      if (code === 400) {
        if (message === 'EMAIL_EXISTS') {
          const errorObject = {
            email: 'пользователь с таким Email уже существует'
          }
          throw errorObject
        }
      }
    }
  }
  async function signIn ({ email, password, ...rest }) {
    try {
      const { data } = await httpAuth.post('accounts:signInWithPassword', { email, password, returnSecureToken: true })
      setTokens(data)
      console.log(data)
    } catch (error) {
      errorCatcher(error)
      console.log(error.response.data.error)
      const { code, message } = error.response.data.error
      if (code === 400) { // EMAIL_NOT_FOUND
        switch (message) {
        case 'INVALID_PASSWORD':
          throw new Error('Неверный Email или пароль!')
        case 'EMAIL_NOT_FOUND':
          throw new Error('Введенный Email не найден!')
        default:
          throw new Error('Слишком много попыток входа. Попробуйте позднее!')
        }
      }
    }
  }
  function errorCatcher (error) {
    const { message } = error.response.data
    setError(message)
  }
  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])
  return (
    <AuthContext.Provider value={{ signUp, signIn, isAuth, login, logout }}>
      { children }
    </AuthContext.Provider>
  )
}