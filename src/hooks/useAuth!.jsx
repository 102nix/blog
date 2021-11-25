import React, { useState, useContext } from 'react'

const AuthContext = React.createContext(null)
export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(JSON.parse(localStorage.getItem('login')) || false)

  function login () {
    setIsAuth(true)
  }
  function logout () {
    setIsAuth(false)
    localStorage.setItem('login', false)
  }
  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      { children }
    </AuthContext.Provider>
  )
}
// import React, { useState } from 'react'

// export const AuthContext = React.createContext(null)

// export default function useAuth (initialValue) {
//   const [isAuth, setIsAuth] = useState(initialValue)

//   function login () {
//     setIsAuth(true)
//   }
//   function logout () {
//     setIsAuth(false)
//     localStorage.setItem('login', false)
//   }
//   return [isAuth, login, logout]
// }