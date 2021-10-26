import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { InputComponent } from '../../components/InputComponent/InputComponent'
import { TextareaComponent } from '../../components/TextareaComponent/TextareaComponent'
import { useHistory } from 'react-router-dom'
import './AddArticle.scss'

export const AddArticle = () => {

  const history = useHistory()

  return (
    <div className="add-article">
      <h3>Добавление статьи</h3>
      <Formik
        initialValues={{
          title: '',
          article: ''
        }}
        validationSchema={Yup.object({
          title: Yup.string().required('Поле не должно быть пустым'),
          article: Yup.string().required('Поле не должно быть пустым')
        })}
        onSubmit={dataForm => {
          console.log(dataForm)
        }}
      >
        <Form>
          <InputComponent
            id="title"
            type="text"
            name="title"
            placeholder="Название статьи..."
          />
          <TextareaComponent
            id="article"
            type="text"
            name="article"
            placeholder="Содержание статьи..."
          />
          <div className="form-actions">
            <button className="btn btn-login">Сохранить</button>
            <button className="btn btn-cansel" onClick={() => {history.push('/adminmanagearticles')}}>Отмена</button>
          </div>
        </Form>
      </Formik>
    </div>
  )
}