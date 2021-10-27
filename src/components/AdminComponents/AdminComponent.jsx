import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../../api'
import { ModalEdit } from '../ModalEdit/ModalEdit'
//static data:
import { columns } from '../../static/sortData'
import './AdminManageArticles.scss'
import { AdminAllPage } from '../../pages/AdminAllPage/AdminAllPage'
import { withAllAdmin } from './withAllAdmin'

export const AdminComponent = () => {

  const history = useHistory()

  const AllAdminComponent = withAllAdmin(AdminAllPage)

  const [article, setArticle] = useState(null)
  const [articleId, setArticleId] = useState(null)

  useEffect(() => {
    api.articles.getById(articleId).then(data => setArticle(data))
  },[articleId]) //This articleID get's from handlerEdit(articleId)

  const handlerEdit = (articleId) => {
    setArticleId(articleId)
  }

  const handleCloseModalEdit = () => {
    setArticle(null)
    history.push('/adminmanagearticles')
  }

  return (
    <>
      { article &&
        <ModalEdit
          article={article}
          onCloseModal={handleCloseModalEdit}
        />       
      }
      <AllAdminComponent columns={columns} handlerEdit={handlerEdit}/>
    </>
  )
}