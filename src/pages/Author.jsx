import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import instagramPNG from '../assets/imgs/author/instagram.png'
import emailPNG from '../assets/imgs/author/email.png'
import telegramPNG from '../assets/imgs/author/telegram.png'
import hhPNG from '../assets/imgs/author/hh.png'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '45px auto 0',
    padding: theme.spacing(2),
    backgroundColor: '#4467e3',
    borderRadius: 10,
    textAlign: 'center',
    maxWidth: '370px',
    color: 'white',
    boxShadow: '7px 9px 11px rgb(8, 8, 8)'
  },
  list: {
    margin: '16px auto',
    padding: theme.spacing(2),
    fontSize: '0.875rem',
    maxWidth: '300px',
    '& li': {
      listStyleType: 'none',
      marginBottom: theme.spacing(1),
      transform: 'scale(1)',
      transition: 'transform 1s',
      '& a img': {
        maxWidth: '48px',
        maxHeight: '48px'
      },
      '&:hover': {
        transform: 'scale(1.15)',
        transition: 'transform 1s'
      }
    }
  }
}))

export const Author = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom component="div">
        Контакты
      </Typography>
      <ul className={classes.list}>
        <li>
          <a href='https://ufa.hh.ru/resume/b432f9e6ff078ff3680039ed1f5543336b6155' target="blank">
            <img src={hhPNG} alt="" />
          </a>
        </li>
        <li>
          <a href='https://instagram.com/102nix?utm_medium=copy_link' target="blank">
            <img src={instagramPNG} alt="" />
          </a>
        </li>
        <li>
          <a href='mailto:zalilov@list.ru' target="blank">
            <img src={emailPNG} alt="" />
          </a>
        </li>
        <li>
          <a href='https://t.me/Nix102' target="blank">
            <img src={telegramPNG} alt="" />
          </a>
        </li>
      </ul>
    </div>
  )
}