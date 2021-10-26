import React, { useState, useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { InputComponent } from '../InputComponent/InputComponent'

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
    confirmpassword: yup.string().oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
    password: yup.string().required('Пароль обязателен для заполнения')
    .matches(/(?=.*[A-Z])/,'Пароль должен содержать хотябы 1 заглавную букву')
    .matches(/(?=.*[0-9])/,'Пароль должен содержать хотябы 1 число')
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
      <h2>Регистрация</h2>
      {/* <Formik
        initialValues={{
          login: '',
          password: '',
          confirmpassword: ''
        }}
        validationSchema={Yup.object({
          login: Yup.string().email('Необходимо использовать email').required('Поле не должно быть пустым'),
          password: Yup.string().required('Поле не должно быть пустым'),
          confirmpassword: Yup.string().oneOf([Yup.ref('password'), null], 'Пароли не совпадают')
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
          <InputComponent
            label="Confirm Password:"
            id="confirmpassword"
            type="password"
            name="confirmpassword"
            placeholder="Ещё раз пароль..."
          />
          <div className="form-actions">
            <button className="btn btn-login">Сохранить</button>
            <button className="btn btn-cansel" onClick={() => {history.push('/')}}>Отмена</button>
          </div>
        </Form>
      </Formik> */}
      <div className="form-links">
        <NavLink to='/auth/login' className='link-reg'>Есть логин?</NavLink>
      </div>
    </div>
  )
}