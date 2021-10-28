import React, { useState } from 'react'

export const withNavbar = (Component) => (props) => {
  
  const [showMenu, setShowMenu] = useState(['header__menu'])
  const [clsBurger, setClsBurger] = useState(['header__burger'])

  const handlerVisibleMenu = () => {
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
    />)
}
