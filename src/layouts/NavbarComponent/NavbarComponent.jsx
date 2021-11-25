import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './NavbarComponent.scss'
import { useNavbar } from '../../hooks/useNavbar'
import { AppBar, Toolbar, Typography, IconButton, Button, Menu, MenuItem } from '@material-ui/core'
// import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import MenuIcon from '@mui/icons-material/Menu'
import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    flexGrow: 0
  },
  menuList: {
    display: 'flex',
    flexGrow: 1
  },
  title: {
    flexGrow: 1
    // marginRight: theme.spacing(2)
  }
}))

export const NavbarComponent = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const { isAuth, logout } = useNavbar()
  const classes = useStyles()
  const history = useHistory()
  const matches = useMediaQuery('(max-width:768px)')
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClick = (pageURL) => {
    history.push(pageURL)
    setAnchorEl(null)
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            БлогFrontend
          </Typography>
          <div>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={open}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={() => handleMenuClick('/')}>
                Главная
              </MenuItem>
              <MenuItem onClick={() => handleMenuClick('/articles')}>
                Список статей
              </MenuItem>
              <MenuItem onClick={() => handleMenuClick('/admin')}>
                RootДоступ
              </MenuItem>
              {!isAuth ? (
                <div className='header__list-reg'>
                  <MenuItem onClick={() => handleMenuClick('/auth/login')}>
                    Вход
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuClick('/auth/register')}>
                    Регистрация
                  </MenuItem>
                </div>
              ) : (
                <div className='header__list-reg'>
                  <MenuItem onClick={logout}>
                    Выход
                  </MenuItem>
                </div>
              ) }
            </Menu>
          </div>
          {matches ? (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              area-label="menu"
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <>
              <div className={classes.menuList}>
                <MenuItem onClick={() => handleMenuClick('/')}>
                  Главная
                </MenuItem>
                <MenuItem onClick={() => handleMenuClick('/articles')}>
                  Список статей
                </MenuItem>
                <MenuItem onClick={() => handleMenuClick('/admin')}>
                  RootДоступ
                </MenuItem>
              </div>
              {!isAuth ? (
                <Button color="inherit" onClick={() => handleMenuClick('/auth/login')}>Login</Button>
              ) : (
                <Button color="inherit" onClick={logout}>Выход</Button>
              )}
            </>
          )
          }
        </Toolbar>
      </AppBar>
    </div>
    // <div className="header">
    //   <div className="header__body">
    //     <div className="header__logo">БлогДжуна<span>_frontend</span></div>
    //     <div
    //       className={clsBurger.join(' ')}
    //       onClick={() => handleVisibleMenu()}
    //     >
    //       <span></span>
    //     </div>
    //     <div className={showMenu.join(' ')}>
    //       <ul className="header__list">
    //         <li className="header__list-item">
    //           <NavLink
    //             exact
    //             to="/"
    //             className="header__list-link"
    //             onClick={() => handleVisibleMenu('/')}
    //           >
    //             Главная
    //           </NavLink>
    //         </li>
    //         <li className="header__list-item">
    //           <NavLink
    //             to="/articles"
    //             className="header__list-link"
    //             onClick={() => handleVisibleMenu('articles')}
    //           >
    //             Список статей
    //           </NavLink>
    //         </li>
    //         <li className="header__list-item">
    //           <NavLink
    //             to="/admin"
    //             className="header__list-link"
    //             onClick={() => handleVisibleMenu('root')}
    //           >
    //             RootДоступ
    //           </NavLink>
    //         </li>
    //       </ul>
    //       {!isAuth ? (
    //         <div className='header__list-reg'>
    //           <NavLink
    //             to='/auth/login'
    //             className="header__list-link"
    //             onClick={() => handleVisibleMenu('exit')}
    //           >
    //             Вход
    //           </NavLink>
    //           <NavLink
    //             to='/auth/register'
    //             className="header__list-link"
    //             onClick={() => handleVisibleMenu('reg')}
    //           >
    //             Регистрация
    //           </NavLink>
    //         </div>
    //       ) : (
    //         <div className='header__list-reg'>
    //           <NavLink
    //             to='/auth/login'
    //             className="header__list-link"
    //             onClick={logout}
    //           >
    //             Выход
    //           </NavLink>
    //         </div>
    //       ) }
    //     </div>
    //   </div>
    // </div>
  )
}