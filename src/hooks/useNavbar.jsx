import React, { useState, useContext } from 'react'
import { useAuth } from './useAuth'
import { useStore } from './useStore'

const NavbarContext = React.createContext()

export const useNavbar = () => {
  return useContext(NavbarContext)
}

export const NavbarProvider = ({ children }) => {
  const [showMenu, setShowMenu] = useState(['header__menu'])
  const [clsBurger, setClsBurger] = useState(['header__burger'])
  const { isAuth, logout } = useAuth()
  const { setIsLoading, checkLoadByURL } = useStore()

  const handleVisibleMenu = () => {
    setIsLoading(false)
    checkLoadByURL()
    if (showMenu.indexOf('actived') === -1) {
      setShowMenu([...showMenu, 'actived'])
      setClsBurger([...clsBurger, 'actived'])
    } else {
      setShowMenu([...showMenu.splice(showMenu.indexOf('header__menu'), 1)])
      setClsBurger([...clsBurger.splice(clsBurger.indexOf('header__burger'), 1)])
    }
  }
  const values = {
    showMenu,
    clsBurger,
    handleVisibleMenu,
    isAuth,
    logout
  }
  return (
    <NavbarContext.Provider value={values}>
      { children }
    </NavbarContext.Provider>
  )
}