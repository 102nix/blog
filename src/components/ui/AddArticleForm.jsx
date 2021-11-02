import React, { useState, useEffect } from 'react'
import * as yup from 'yup'
import { useHistory } from 'react-router-dom'
import { TextField } from '../common/form/TextField'
import { TextAreaField } from '../common/form/TextAreaField'
import { handleChange, handleSubmit, handleKeyDown } from '../../static/funcsForForm'

export const AddArticleForm = ({ article, onCloseModal, submitEdit }) => {
  console.log(article)
  const history = useHistory()
  const [data, setData] = useState({
    title: article ? article.title : '',
    article: article ? article.article : '',
    id: article ? article.id : '',
    img: article ? article.img : ''
  })
  const [errors, setErrors] = useState({})

  const validateScheme = yup.object().shape({
    article: yup.string().required('Содержание статьи - обязательно'),
    title: yup.string().required('Необходимо указать название статьи')
  })

  const validate = () => {
    validateScheme.validate(data).then(() => setErrors({})).catch(err => setErrors({ [err.path]: err.message }))
    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(errors).length === 0

  useEffect(() => {
    validate()
  }, [data])

  return (
    <form className='form-add-article' onSubmit={submitEdit ? (e) => submitEdit(e, data, article.id) : (e) => handleSubmit(e, validate, data)}>
      <TextField
        name="title"
        value={data.title}
        onChange={(target) => handleChange(setData, target)}
        error={errors.title}
        autoFocus
        placeholder="Название статьи..."
        className="input-add-article"
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <TextAreaField
        id="article"
        type="text"
        name="article"
        className="ta-add-article"
        value={data.article}
        error={errors.article}
        onChange={(target) => handleChange(setData, target)}
        placeholder="Содержание статьи..."
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <div className="form-actions">
        <button
          type="submit"
          disabled={!isValid}
          className={isValid ? 'btn btn-save-article' : 'btn-disabled' }
        >
          Сохранить
        </button>
        {onCloseModal ? (
          <button
            type="button"
            className="btn btn-cansel"
            onClick={onCloseModal}
          >
            Отмена
          </button>
        ) : (
          <button className="btn btn-cansel" onClick={() => history.goBack()}>Отмена</button>
        )
        }
      </div>
    </form>
  )
}