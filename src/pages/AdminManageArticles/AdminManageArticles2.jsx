import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import _ from 'lodash'
import api from '../../api'
//components:
import Loader from '../../components/Loader/Loader'
import { TableHeader } from '../../components/TableComponents/TableHeader'
import { TableBody } from '../../components/TableComponents/TableBody'
import { ModalEdit } from '../../components/ModalEdit/ModalEdit'
//static data:
import { columns } from '../../static/sortData'
import './AdminManageArticles.scss'

export const AdminManageArticles = () => {

  const history = useHistory()

  const [articles, setArticles] = useState([])
  const [article, setArticle] = useState(null)
  const [articleId, setArticleId] = useState(null)
  const [sortBy, setSortBy] = useState({ path: 'name', order: "asc" })
  
  useEffect(() => {
    api.articles.fetchAll().then(data => setArticles(data))
  }, [])

  useEffect(() => {
    api.articles.getById(articleId).then(data => setArticle(data))
  },[articleId]) //This articleID get's from handlerEdit(articleId)

  const sortedArticles = _.orderBy(articles, [sortBy.path], [sortBy.order])

  const handleSort = (item) => {
    setSortBy(item)
  }

  const handlerDelArticle = (articleId) => {
    console.log(articleId)
  }

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
      <div className="admin-articles">
        <div className="admin-articles__header-block">
          <h3>Статьи:</h3>
          <button className='btn' onClick={() => history.push('/addarticle') }>Создать статью</button>
        </div>
        {articles.length > 0 ? (
          <table className="table">
            <TableHeader 
              onSort={handleSort}
              selectedSort={sortBy}
              columns={columns}
            />
            <TableBody 
              columns={columns}
              data={sortedArticles}
              onDelete={handlerDelArticle}
              onEdit={handlerEdit}
            />
          </table>
        ) : (
          <div className="loader-container">
            <Loader />
          </div>
        )}
      </div>
    </>
  )
}