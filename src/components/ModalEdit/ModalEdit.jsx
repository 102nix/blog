import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { InputComponent } from '../InputComponent/InputComponent'
import { TextareaComponent } from '../TextareaComponent/TextareaComponent'
import { useHistory } from 'react-router-dom'
import './ModalEdit.scss'

export const ModalEdit = ({ article, onCloseModal }) => {

  const history = useHistory()


  return (
    <div className="modal-window">
      <div className="modal_container">
        <h3>Редактирование</h3>
        <Formik
          initialValues={{
            title: article.title,
            article: article.article
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
              <button type='button' className="btn btn-cansel" onClick={onCloseModal}>Отмена</button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  )
}
