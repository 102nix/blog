import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'
import { TextField } from '../common/form/TextField'
import { handleChange, handleSubmit, handleKeyDown } from '../../static/funcsForForm'

export const RegisterForm = () => {
  const history = useHistory()

  const [data, setData] = useState({
    email: '',
    password: '',
    confirmpassword: ''
  })

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

  return (
    <form className="form-auth" onSubmit={(e) => handleSubmit(e, validate, data)}>
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
      <TextField
        label="Повторить пароль"
        type="password"
        name="confirmpassword"
        value={data.confirmpassword}
        onChange={(target) => handleChange(setData, target)}
        error={errors.confirmpassword}
        className="input-auth-form"
        onKeyDown={(e) => handleKeyDown(e)}
      />
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
    </form>
  )
}