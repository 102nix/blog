import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { InputComponent } from '../../components/InputComponent/InputComponent'
import './Registration.scss'

export const Login = () => {

  const history = useHistory()

  return (
    <div className="registration">
      <h2>Вход</h2>
      <Formik
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
        <Form className='form-reg'>
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
      </Formik>
      <div className="form-links">
        <NavLink to='/registration' className='link-reg'>Нет логина?</NavLink>
      </div>
    </div>
  )
}