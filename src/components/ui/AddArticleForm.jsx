import React, { useState, useEffect } from 'react'
import * as yup from 'yup'
import { ComponentInput } from '../common/form/TextField'
import { TextAreaField } from '../common/form/TextAreaField'
import { handleChange, handleKeyDown } from '../../static/funcsForForm'
import { InputFile } from '../common/typografy/InputFile/InputFile'
import { Box, Button } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  errText: {
    color: '#eb4242'
  },
  titleArticle: {
    width: '100%'
  },
  formActions: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px'
  }
}))

export const AddArticleForm = ({ article, onCloseModal, submitEdit }) => {
  const [data, setData] = useState({
    title: article ? article.title : '',
    article: article ? article.article : '',
    id: article ? article.id : Date.now()
  })
  const classes = useStyles()
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
    setUploadName(e.target.value.split('\\')[2]) // display file name
    const reader = new FileReader()
    reader.onload = (e) => {
      setDataUri(e.target.result)
    }
    reader.readAsDataURL(e.target.files[0])
  }
  // ////////////////////////////////////////////////////////////////

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column'
      }}
      noValidate
      autoComplete="off"
      onSubmit={(e) => submitEdit(e, data, dataUri)}
    >
      <ComponentInput
        label="Название статьи:"
        name="title"
        value={data.title}
        onChange={(target) => handleChange(setData, target)}
        error={errors.title}
        autoFocus
        placeholder="Новая..."
        className={classes.titleArticle}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <TextAreaField
        label="Текст статьи:"
        id="article"
        type="text"
        name="article"
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
      <Box className={classes.formActions}>
        <Button
          type="submit"
          disabled={!isValid}
          variant="contained"
          endIcon={<SaveIcon />}
        >
          Сохранить
        </Button>
        <Button variant="outlined" type="button" onClick={onCloseModal}>Отмена</Button>
      </Box>
    </Box>
  )
}