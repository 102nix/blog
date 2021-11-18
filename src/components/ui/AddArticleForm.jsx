import React, { useState, useEffect } from 'react'
import * as yup from 'yup'
import { useHistory } from 'react-router-dom'
import { TextField } from '../common/form/TextField'
import { TextAreaField } from '../common/form/TextAreaField'
import { handleChange, handleKeyDown } from '../../static/funcsForForm'

export const AddArticleForm = ({ article, onCloseModal, submitEdit, submitAdd }) => {
  console.log(article)
  const history = useHistory()
  const [data, setData] = useState({
    title: article ? article.title : '',
    article: article ? article.article : '',
    id: article ? article.id : Date.now()
  })
  const [dataUri, setDataUri] = useState('')
  const [errors, setErrors] = useState({})

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
  // const fileToDataUrl = (file) => new Promise((resolve, reject) => {
  //   const reader = new FileReader()
  //   reader.onload = (event) => {
  //     resolve(event.target.result)
  //   }
  //   reader.readAsDataURL(file)
  // })
  // const fileUploadInputChange = (e) => {
  //   fileToDataUrl(e.target.files[0])
  //     .then(dataUri => {
  //       setDataUri(dataUri)
  //       console.log(dataUri)
  //     })
  // }
  function fileUploadInputChange (e) {
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
      <input
        label="Прикрепить IMG:"
        name="img"
        type="file"
        onChange={(e) => fileUploadInputChange(e)}
        className="input-add-article"
      />
      {/* <TextField
        label="Ссылка на IMG:"
        name="img"
        value={data.img}
        onChange={(target) => handleChange(setData, target)}
        error={errors.img}
        placeholder="/static/media/*.png"
        className="input-add-article"
        onKeyDown={(e) => handleKeyDown(e)}
      /> */}
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