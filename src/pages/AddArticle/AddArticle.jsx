import React from 'react'
import { useHistory } from 'react-router-dom'
import { AddArticleForm } from '../../components/ui/AddArticleForm'
import './AddArticle.scss'

export const AddArticle = () => {

  const history = useHistory()

  return (
    <div className="add-article">
      <h3>Добавление статьи</h3>
      <AddArticleForm />
    </div>
  )
}