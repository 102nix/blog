import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import localStorageService from '../services/localStorage.service'
import { useLocation } from 'react-router-dom'

export const httpAuth = axios.create({
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
  const [isAuth, setAuth] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const url = location.pathname || ''
    if (url === '/articles' || url === '/admin') {
      localStorageService.checkLogin(setAuth)
    }
  }, [location.pathname])

  useEffect(() => {
    localStorageService.checkLogin(setAuth)
  }, [])

  function logout () {
    setAuth(false)
    localStorageService.removeAuthData()
  }

  async function signUp ({ email, password }) {
    try {
      const { data } = await httpAuth.post('accounts:signUp', { email, password, returnSecureToken: true })
      // localStorage.setTokens(data)
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
  async function signIn ({ email, password, stayOn }) {
    try {
      const { data } = await httpAuth.post('accounts:signInWithPassword', { email, password, returnSecureToken: true })
      data.stayOn = stayOn
      console.log(data)
      localStorageService.setTokens(data, setAuth)
      console.log('+++++')
      setCurrentUser(localStorageService.getEmailUser())
      console.log(localStorageService.getEmailUser())
    } catch (error) {
      errorCatcher(error)
      const { code, message } = error.response.data.error
      if (code === 400) {
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
    <AuthContext.Provider value={{ signUp, signIn, isAuth, setAuth, logout, currentUser }}>
      { children }
    </AuthContext.Provider>
  )
}