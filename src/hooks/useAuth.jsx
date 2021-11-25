import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { setTokens } from '../services/localStorage.service'

const httpAuth = axios.create()
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
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KET}`
    try {
      const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true })
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
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KET}`
    try {
      const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true })
      setTokens(data)
      console.log(data)
    } catch (error) {
      errorCatcher(error)
      console.log(error.response.data.error)
      const { code } = error.response.data.error
      if (code === 400) {
        // if (message === 'INVALID_PASSWORD') {
        //   const errorObject = {
        //     email: 'Неверный Email или пароль'
        //   }
        //   throw errorObject
        // }
        const errorObject = {
          email: 'Неверный Email или пароль'
        }
        throw errorObject
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