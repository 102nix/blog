import React, { useState, useEffect } from 'react'
import * as yup from 'yup'
import { useHistory } from 'react-router-dom'
import { TextField } from '../common/form/TextField'
import { TextAreaField } from '../common/form/TextAreaField'

export const AddArticleForm = () => {

  const history = useHistory()

  const [data, setData] = useState({title: '', article: ''})
  const [errors, setErrors] = useState({})

  const handleChange = (target) => {
    setData(prevSate => ({
      ...prevSate,
      [target.name]: target.value
    }))
  }

  let validateScheme = yup.object().shape({
    article: yup.string().required('Содержание статьи - обязательно'),
    title: yup.string().required('Необходимо указать название статьи'),
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

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault()
      const form = e.target.form
      const indexField = Array.prototype.indexOf.call(form, e.target)
      form.elements[indexField+1].focus()
    }
  }

  return (
    <form className='form-add-article' onSubmit={handleSubmit}>
      <TextField
        name="title"
        value={data.email}
        onChange={handleChange}
        error={errors.title}
        autoFocus
        placeholder="Название статьи..."
        className="input-add-article"
        onKeyDown={handleKeyDown}
      />
      <TextAreaField
        id="article"
        type="text"
        name="article"
        className="ta-add-article"
        value={data.value}
        error={errors.article}
        onChange={handleChange}
        placeholder="Содержание статьи..."
        onKeyDown={handleKeyDown}
      />
      <div className="form-actions">
      <button 
          type="submit"
          disabled={!isValid}
          className={isValid ? "btn btn-save-article" : 'btn-disabled' } 
        >
          Сохранить
        </button>
        <button className="btn btn-cansel" onClick={() => {history.push('/adminmanagearticles')}}>Отмена</button>
      </div>
    </form>)
    }