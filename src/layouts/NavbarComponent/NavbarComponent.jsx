import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './NavbarComponent.scss'
import { useNavbar } from '../../hooks/useNavbar'
import { AppBar, Toolbar, Typography, IconButton, Button, Menu, MenuItem } from '@material-ui/core'
import MenuIcon from '@mui/icons-material/Menu'
import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

const useStyles = makeStyles((theme) => ({
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
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          БлогFrontend
        </Typography>
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
            <div>
              <MenuItem onClick={() => handleMenuClick('/auth/login')}>
                Вход
              </MenuItem>
              <MenuItem onClick={() => handleMenuClick('/auth/register')}>
                Регистрация
              </MenuItem>
            </div>
          ) : (
            <MenuItem onClick={logout}>
              Выход
            </MenuItem>
          ) }
        </Menu>
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
  )
}