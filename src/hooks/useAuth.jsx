import { useState } from 'react'

export default function useAuth (initialValue) {
  const [isAuth, setIsAuth] = useState(initialValue)

  function login () {
    setIsAuth(true)
  }
  function logout () {
    setIsAuth(false)
    localStorage.setItem('login', false)
  }
  return [isAuth, login, logout]
}