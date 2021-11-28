import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'
import { ComponentInput } from '../common/form/TextField'
import { CheckBoxField } from '../common/form/CheckBoxField'
import { handleChange, handleKeyDown } from '../../static/funcsForForm'
import { useAuth } from '../../hooks/useAuth'
import { FormTemplate } from '../common/form/FormTemplate'

export const LoginForm = () => {
  console.log('testing...')
  const history = useHistory()
  const { login } = useAuth()
  const [data, setData] = useState({
    email: '', password: '', stayOn: false
  })

  const { signIn } = useAuth()
  const [errors, setErrors] = useState({})

  const validateScheme = yup.object().shape({
    password: yup.string().required('Пароль обязателен для заполнения')
      .matches(/(?=.*[A-Z])/, 'Пароль должен содержать хотябы 1 заглавную букву')
      .matches(/(?=.*[0-9])/, 'Пароль должен содержать хотябы 1 число')
      .matches(/(?=.{8,})/, 'Пароль должен состоять минимум из 8 символов'),
    email: yup.string().required('Email обязательно для заполнения').email('Email введён некорректно')
  })

  const validate = () => {
    validateScheme.validate(data).then(() => setErrors({})).catch(err => setErrors({ [err.path]: err.message }))
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
    console.log(data)
    try {
      await signIn(data)
      login()
      if (data.stayOn) localStorage.setItem('login', data.stayOn)
      history.push('/')
    } catch (error) {
      setErrors(error)
    }
  }

  return (
    <FormTemplate handleSubmit={handleSubmit} isValid={isValid}>
      <ComponentInput
        label="Электронная почта"
        name="email"
        value={data.email}
        onChange={(target) => handleChange(setData, target)}
        error={errors.email}
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
      <CheckBoxField
        value={data.stayOn}
        onChange={(target) => handleChange(setData, target)}
        name='stayOn'
        onKeyDown={(e) => handleKeyDown(e)}
      >
        Оставаться в системе
      </CheckBoxField>
    </FormTemplate>)
}