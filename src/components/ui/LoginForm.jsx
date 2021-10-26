import React, { useState, useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { Formik, Form } from 'formik'
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
    <div className="auth">
      <h2>Вход</h2>
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
      </form>
      {/* <Formik
        initialValues={{
          login: '',
          password: '',
        }}
        validationSchema={Yup.object({
          login: Yup.string().email('Необходимо использовать email').required('Поле не должно быть пустым'),
          password: Yup.string().required('Поле не должно быть пустым'),
        })}
        onSubmit = {dataForm => {
          console.log(dataForm)
        }}
      >
        <Form className='form-auth'>
          <InputComponent
            label="Email:"
            id="login"
            type="text"
            name="login"
            placeholder="Введите ваш email..."
          />
          <InputComponent
            label="Password:"
            id="password"
            type="password"
            name="password"
            placeholder="Введите ваш пароль..."
          />
          <div className="form-actions">
            <button className="btn btn-login">Сохранить</button>
            <button className="btn btn-cansel" onClick={() => {history.push('/')}}>Отмена</button>
          </div>
        </Form>
      </Formik> */}
      <div className="form-links">
        <NavLink to='/auth/register' className='link-auth'>Нет логина?</NavLink>
      </div>
    </div>
  )
}