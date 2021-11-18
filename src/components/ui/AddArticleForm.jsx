import React, { useState, useEffect } from 'react'
import * as yup from 'yup'
import { TextField } from '../common/form/TextField'
import { TextAreaField } from '../common/form/TextAreaField'
import { handleChange, handleKeyDown } from '../../static/funcsForForm'
import { InputFile } from '../common/typografy/InputFile/InputFile'

export const AddArticleForm = ({ article, onCloseModal, submitEdit }) => {
  const [data, setData] = useState({
    title: article ? article.title : '',
    article: article ? article.article : '',
    id: article ? article.id : Date.now()
  })
  const [dataUri, setDataUri] = useState(article?.img || '')
  const [errors, setErrors] = useState({})
  const [uploadName, setUploadName] = useState('')

  const handleUserKeyPress = event => {
    const { keyCode } = event
    if (keyCode === 27) onCloseModal()
  }

  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress)

    return () => {
      window.removeEventListener('keydown', handleUserKeyPress)
    }
  })

  const validateScheme = yup.object().shape({
    id: yup.string().required('Необходимо указать ID статьи'),
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

  // block for prepare imgs for DB: ////////////////////////////////
  function fileUploadInputChange (e) {
    setUploadName(e.target.value.split('\\')[2])
    const reader = new FileReader()
    reader.onload = (e) => {
      setDataUri(e.target.result)
    }
    reader.readAsDataURL(e.target.files[0])
  }
  // ////////////////////////////////////////////////////////////////

  return (
    <form className='form-add-article' onSubmit={(e) => submitEdit(e, data, dataUri)}>
      <TextField
        label="Название статьи:"
        name="title"
        value={data.title}
        onChange={(target) => handleChange(setData, target)}
        error={errors.title}
        autoFocus
        placeholder="Новая..."
        className="input-add-article"
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <TextAreaField
        label="Текст статьи:"
        id="article"
        type="text"
        name="article"
        className="ta-add-article"
        value={data.article}
        error={errors.article}
        onChange={(target) => handleChange(setData, target)}
        placeholder="Содержание..."
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <InputFile
        article={article}
        fileUploadInputChange={fileUploadInputChange}
        uploadName={uploadName}
        dataUri={dataUri}
      />
      <TextField
        label="Id сатьи:"
        name="id"
        value={data.id}
        onChange={(target) => handleChange(setData, target)}
        error={errors.id}
        placeholder="ID..."
        className="input-add-article"
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
        <button
          type="button"
          className="btn btn-cansel"
          onClick={onCloseModal}
        >
          Отмена
        </button>
      </div>
    </form>
  )
}