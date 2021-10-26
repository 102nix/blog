import React, { useState, useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import * as yup from 'yup'
import { TextField } from '../common/form/TextField'

export const RegisterForm = () => {

  const history = useHistory()

  const [data, setData] = useState({
    email: '', 
    password: '', 
    confirmpassword: '',
  })

  const [errors, setErrors] = useState({})

  const handleChange = (target) => {
    setData(prevSate => ({
      ...prevSate,
      [target.name]: target.value
    }))
  }

  let validateScheme = yup.object().shape({
    password: yup.string()
      .required('Пароль обязателен для заполнения')
      .matches(/(?=.*[A-Z])/,'Пароль должен содержать хотябы 1 заглавную букву')
      .matches(/(?=.*[0-9])/,'Пароль должен содержать хотябы 1 число')
      .matches(/(?=.{8,})/,'Пароль должен состоять минимум из 8 символов'),
    email: yup.string().required('Email обязательно для заполнения').email('Email введён некорректно'),
  })
  let validateConfirmPass = yup.object().shape({
    confirmpassword: yup.string().oneOf([yup.ref('password'), null], 'Пароли не совпадают')
    
  }) 
  
  const validate = () => {
    validateScheme.validate(data).then(() => setErrors({})).catch(err => setErrors({[err.path]: err.message}))
    validateConfirmPass.validate(data).then(() => setErrors({})).catch(err => setErrors({[err.path]: err.message}))
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
    <div className="auth">
      <h2>Регистрация</h2>
      <form className="form-auth" onSubmit={handleSubmit}>
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
        <TextField 
          label="Повторить пароль"
          type="password"
          name="confirmpassword"
          value={data.confirmpassword}
          onChange={handleChange}
          error={errors.confirmpassword}
        />
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
      </form>
      <div className="form-links">
        <NavLink to='/auth/login' className='link-reg'>Есть логин?</NavLink>
      </div>
    </div>
  )
}