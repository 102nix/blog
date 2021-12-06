import React from 'react'
import { SubTitle } from '../components/common/typografy/SubTitle'
import { Typography, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CampaignIcon from '@mui/icons-material/Campaign'
import DoneIcon from '@mui/icons-material/Done'

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center'
  },
  infoBlog: {
    padding: '30px 20px',
    marginBottom: theme.spacing(4),
    border: '1px solid #fff',
    borderRadius: '2px',
    boxShadow: '7px 9px 11px rgb(8, 8, 8)'
  },
  list: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    fontSize: '0.875rem',
    '& li': {
      listStyleType: 'none'
    }
  }
}))

export const About = () => {
  const classes = useStyles()
  return (
    <div>
      <SubTitle>О проекте</SubTitle>
      <Divider light />
      <div className={classes.infoBlog}>
        <Typography variant="body2" gutterBottom>
          Это дипломный проект, в котором необходимо реализовать SPA приложение с клиент-серверной архитектурой на уровне Junior Frontend Developer.
          Тема проекта - Блог.
        </Typography>
        <Typography variant="body2" gutterBottom>К проекту выдвигается несколько требований:</Typography>
        <Divider light />
        <ul className={classes.list}>
          <li><CampaignIcon />Страница с перечнем всех статей и кнопкой перехода на отдельную статью</li>
          <li><CampaignIcon />Страница отдельной статьи</li>
          <li><CampaignIcon />Страница администратора для управления статьями</li>
          <li><CampaignIcon />Страница администратора для добавления новой статьи</li>
          <li><CampaignIcon />Страницы входа / регистрации в админ панель</li>
          <li><CampaignIcon />Реализовать минимум 2 формы для отправки данных на сервер через POST запрос</li>
          <li><CampaignIcon />Использовать React Router</li>
          <li><CampaignIcon />Приватные страницы, редактирование элементов, удаление элементов</li>
          <li><CampaignIcon />Кастомные хуки</li>
        </ul>
        <Typography variant="body2" gutterBottom>Используемые технологии:</Typography>
        <Divider light />
        <ul className={classes.list}>
          <li><DoneIcon />Библиотека React. используются функциональные компоненты.</li>
          <li><DoneIcon />React-хуки: useState, useEffect, useRef, UseContext, UseReducer</li>
          <li><DoneIcon />React Router, паттерн для защиты роутев</li>
          <li><DoneIcon />Библиотеки: Lodash, Аxiosб Yup, React Toastify</li>
          <li><DoneIcon />Кастомные хуки с паттернами, в которых используются children</li>
          <li><DoneIcon />Паттерны для отрисовки таблиц.</li>
          <li><DoneIcon />Как промежуточный вариант для стейт менеджмента используется кастомный хук + useReducer</li>
        </ul>
      </div>
    </div>
  )
}