import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'
import { ComponentInput } from '../common/form/TextField'
import { handleChange, handleKeyDown } from '../../static/funcsForForm'
import { useAuth } from '../../hooks/useAuth'
import { Box, Button } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

export const RegisterForm = () => {
  const history = useHistory()

  const [data, setData] = useState({
    email: '',
    password: '',
    confirmpassword: ''
  })
  const { signUp } = useAuth()
  const [errors, setErrors] = useState({})

  const validateScheme = yup.object().shape({
    password: yup.string()
      .required('Пароль обязателен для заполнения')
      .matches(/(?=.*[A-Z])/, 'Пароль должен содержать хотябы 1 заглавную букву')
      .matches(/(?=.*[0-9])/, 'Пароль должен содержать хотябы 1 число')
      .matches(/(?=.{8,})/, 'Пароль должен состоять минимум из 8 символов'),
    email: yup.string().required('Email обязательно для заполнения').email('Email введён некорректно')
  })
  const validateConfirmPass = yup.object().shape({
    confirmpassword: yup.string().oneOf([yup.ref('password'), null], 'Пароли не совпадают')
  })

  const validate = () => {
    validateScheme.validate(data).then(() => setErrors({})).catch(err => setErrors({ [err.path]: err.message }))
    validateConfirmPass.validate(data).then(() => setErrors({})).catch(err => setErrors({ [err.path]: err.message }))
    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(errors).length === 0

  useEffect(() => {
    validate()
  }, [data])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    try {
      await signUp(data)
      history.push('/auth/login')
    } catch (error) {
      setErrors(error)
    }
  }

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '35ch' },
        display: 'flex',
        flexDirection: 'column'
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <ComponentInput
        label="Электронная почта"
        name="email"
        value={data.email}
        onChange={(target) => handleChange(setData, target)}
        error={errors.email}
        className="input-auth-form"
        autoFocus
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <ComponentInput
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={(target) => handleChange(setData, target)}
        error={errors.password}
        className="input-auth-form"
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <ComponentInput
        label="Повторить пароль"
        type="password"
        name="confirmpassword"
        value={data.confirmpassword}
        onChange={(target) => handleChange(setData, target)}
        error={errors.confirmpassword}
        className="input-auth-form"
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <Box sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px'
      }}>
        <Button
          type="submit"
          disabled={!isValid}
          variant="contained"
          endIcon={<SendIcon />}
        >
          Отправить
        </Button>
        <Button variant="outlined" onClick={() => { history.push('/') }}>Отмена</Button>
      </Box>
    </Box>
  )
}