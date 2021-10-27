import React, { useState, useEffect } from 'react'
import api from '../../api'
import Loader from '../common/Loader/Loader'
import _ from 'lodash'
import { ModalEdit } from '../ModalEdit/ModalEdit'

export const withAllAdmin = (Component) => (props) => {
  
  const [articles, setArticles] = useState([])
  const [sortBy, setSortBy] = useState({ path: 'name', order: "asc" })
  const [article, setArticle] = useState(null)
  const [articleId, setArticleId] = useState(null)

  useEffect(() => {
    api.articles.fetchAll().then(data => setArticles(data))
  }, [])

  useEffect(() => {
    api.articles.getById(articleId).then(data => setArticle(data))
  },[articleId]) //This articleID get's from handlerEdit(articleId)

  const handlerEdit = (articleId) => {
    setArticleId(articleId)
  }

  const handleCloseModalEdit = () => {
    setArticle(null)
  }

  const sortedArticles = _.orderBy(articles, [sortBy.path], [sortBy.order])
  
  const handleSort = (item) => {
    setSortBy(item)
  }

  const handlerDelArticle = (articleId) => {
    console.log(articleId)
  }

  return (
    <>
     { article &&
        <ModalEdit
          article={article}
          onCloseModal={handleCloseModalEdit}
        />
     }
      {articles.length > 0 ? (
        <Component 
          sortedArticles={sortedArticles} 
          columns={props.columns}
          sortBy={sortBy}
          handleSort={handleSort}
          handlerDelArticle={handlerDelArticle}
          handlerEdit={handlerEdit}
        />
        ) : (
          <div className="loader-container">
              <Loader />
          </div>
      )}
    </>)
}