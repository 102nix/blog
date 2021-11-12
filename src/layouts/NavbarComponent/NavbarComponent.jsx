import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavbarComponent.scss'
import { useNavbar } from '../../hooks/useNavbar'

export const NavbarComponent = () => {
  const { showMenu, handleVisibleMenu, clsBurger, isAuth, logout } = useNavbar()
  return (
    <div className="header">
      <div className="header__body">
        <div className="header__logo">БлогДжуна<span>_frontend</span></div>
        <div
          className={clsBurger.join(' ')}
          onClick={() => handleVisibleMenu()}
        >
          <span></span>
        </div>
        <div className={showMenu.join(' ')}>
          <ul className="header__list">
            <li className="header__list-item">
              <NavLink
                exact
                to="/"
                className="header__list-link"
                onClick={() => handleVisibleMenu('/')}
              >
                Главная
              </NavLink>
            </li>
            <li className="header__list-item">
              <NavLink
                to="/articles"
                className="header__list-link"
                onClick={() => handleVisibleMenu('articles')}
              >
                Список статей
              </NavLink>
            </li>
            <li className="header__list-item">
              <NavLink
                to="/admin"
                className="header__list-link"
                onClick={() => handleVisibleMenu('root')}
              >
                RootДоступ
              </NavLink>
            </li>
          </ul>
          {!isAuth ? (
            <div className='header__list-reg'>
              <NavLink
                to='/auth/login'
                className="header__list-link"
                onClick={() => handleVisibleMenu('exit')}
              >
                Вход
              </NavLink>
              <NavLink
                to='/auth/register'
                className="header__list-link"
                onClick={() => handleVisibleMenu('reg')}
              >
                Регистрация
              </NavLink>
            </div>
          ) : (
            <div className='header__list-reg'>
              <NavLink
                to='/auth/login'
                className="header__list-link"
                onClick={logout}
              >
                Выход
              </NavLink>
            </div>
          ) }
        </div>
      </div>
    </div>
  )
}