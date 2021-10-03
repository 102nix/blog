import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './NavbarComponent.scss'

export const NavbarComponent = () => {
  
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
    <div className="header">
      <div className="header__body">
        <div className="header__logo">БлогДжуна<span>_frontend</span></div>
        <div 
          className={clsBurger.join(" ")} 
          onClick={handlerVisibleMenu}  
        >
          <span></span>
        </div>
        <div className={showMenu.join(" ")}>
          <ul className="header__list">
            <li className="header__list-item">
              <NavLink 
                exact 
                to="/" 
                className="header__list-link"
                onClick={handlerVisibleMenu}  
              >
                Главная
              </NavLink>
            </li>
            <li className="header__list-item">
              <NavLink 
                to="/articles" 
                className="header__list-link"
                onClick={handlerVisibleMenu}  
              >
                Список статей
              </NavLink>
            </li>
            <li className="header__list-item">
              <NavLink 
                to="/about" 
                className="header__list-link"
                onClick={handlerVisibleMenu}  
              >
                About ME
              </NavLink>
            </li>
          </ul>
          <div className='header__list-reg'>
              <NavLink
                to='/login'
                className="header__list-link"
                onClick={handlerVisibleMenu}
              >
                Вход
              </NavLink>
              <NavLink
                to='/registration'
                className="header__list-link"
                onClick={handlerVisibleMenu}
              >
                Регистрация
              </NavLink>
          </div>
        </div>
        {/* <div className={showMenu.join(" ")}>

        </div> */}
      </div>
    </div>
  )
}

