import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'
import { TextField } from '../common/form/TextField'
import { CheckBoxField } from '../common/form/CheckBoxField'
import { handleChange, handleKeyDown } from '../../static/funcsForForm'

export const LoginForm = ({ login }) => {
  const history = useHistory()

  const [data, setData] = useState({
    email: '', password: '', stayOn: false
  })

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

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    console.log(data)
    login()
    history.push('/')
  }

  return (
    <form className='form-auth' onSubmit={handleSubmit}>
      <TextField
        label="Электронная почта"
        name="email"
        value={data.email}
        onChange={(target) => handleChange(setData, target)}
        error={errors.email}
        className="input-auth-form"
        autoFocus
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <TextField
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
      <div className="form-actions">
        <button
          type="submit"
          disabled={!isValid}
          className="btn btn-login"
        >
          Submit
        </button>
        <button className="btn btn-cansel" onClick={() => { history.push('/') }}>Отмена</button>
      </div>
    </form>)
}