import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'
import { TextField } from '../common/form/TextField'
import { CheckBoxField } from '../common/form/CheckBoxField'

export const LoginForm = () => {

  const history = useHistory()

  const [data, setData] = useState({
    email: '', password: '', stayOn: false
  })

  const [errors, setErrors] = useState({})

  const handleChange = (target) => {
    console.log(target)
    setData(prevSate => ({
      ...prevSate,
      [target.name]: target.value
    }))
  }

  let validateScheme = yup.object().shape({
    password: yup.string().required('Пароль обязателен для заполнения')
    .matches(/(?=.*[A-Z])/,'Пароль должен содержать хотябы 1 заглавную букву')
    .matches(/(?=.*[0-9])/,'Пароль должен содержать хотябы 1 число')
    .matches(/(?=.*[!@#$%^&*])/,'Пароль должен содержать один из специальных символов !@#$%^&*')
    .matches(/(?=.{8,})/,'Пароль должен состоять минимум из 8 символов'),
    email: yup.string().required('Email обязательно для заполнения').email('Email введён некорректно'),
  }) 

  const validate = () => {
    validateScheme.validate(data).then(() => setErrors({})).catch(err => setErrors({[err.path]: err.message}))
    return Object.keys(errors).length === 0 
  }

  const isValid = Object.keys(errors).length === 0

  useEffect (() => {
    validate()
  }, [data])

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    console.log(data)
  }

  return (
    <form className='form-auth' onSubmit={handleSubmit}>
      <TextField 
        label="Электронная почта"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
        autoFocus
      />
      <TextField 
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <CheckBoxField 
        value={data.stayOn}
        onChange={handleChange}
        name='stayOn'
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
        <button className="btn btn-cansel" onClick={() => {history.push('/')}}>Отмена</button>
      </div>
    </form>)
}