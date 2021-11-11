import React, { useState, useContext } from 'react'
import { useStore } from '../../hooks/useStore'
import { DataContext } from '../common/DataContext'

export const withNavbar = (Component) => (props) => {
  const [showMenu, setShowMenu] = useState(['header__menu'])
  const [clsBurger, setClsBurger] = useState(['header__burger'])
  const { isAuth, logout } = useContext(DataContext)
  const { closeArticle } = useStore()

  const handlerVisibleMenu = () => {
    closeArticle()
    if (showMenu.indexOf('actived') === -1) {
      setShowMenu([...showMenu, 'actived'])
      setClsBurger([...clsBurger, 'actived'])
    } else {
      setShowMenu([...showMenu.splice(showMenu.indexOf('header__menu'), 1)])
      setClsBurger([...clsBurger.splice(clsBurger.indexOf('header__burger'), 1)])
    }
  }
  return (
    <Component
      showMenu={showMenu}
      clsBurger={clsBurger}
      handlerVisibleMenu={handlerVisibleMenu}
      auth={isAuth}
      logout={logout}
    />)
}