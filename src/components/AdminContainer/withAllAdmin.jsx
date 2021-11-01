import React, { useState, useEffect } from 'react'
import api from '../../api'
import LoaderComponent from '../common/Loader/Loader'
import _ from 'lodash'
import { ModalEdit } from '../ModalEdit/ModalEdit'
import Loader from 'react-loader-spinner'

export const withAllAdmin = (Component) => (props) => {
  const [articles, setArticles] = useState([])
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
  const [article, setArticle] = useState(null)
  const [articleId, setArticleId] = useState(null)
  const [newArticle, setNewArticle] = useState(null)
  const [isLoader, setIsLoader] = useState(false)

  useEffect(() => {
    api.articles.fetchAll().then((data) => setArticles(data))
  }, [])

  useEffect(() => {
    api.articles.getById(articleId).then((data) => {
      setIsLoader(false)
      setArticle(data)
    })
  }, [articleId]) // This articleID get's from handlerEdit(articleId)

  const handlerEdit = (articleId) => {
    setArticleId(articleId)
    setIsLoader(true)
  }

  const handleCloseModalEdit = () => {
    setArticle(null)
    setNewArticle(null)
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
      {isLoader && (
        <div className='loader-container'>
          <Loader
            type='Bars'
            color='#000'
            height={50}
            width={50}
            timeout={3000} // 3 secs
          />
        </div>
      )}
      {(article || newArticle === 'addArt') && (
        <ModalEdit article={article} onCloseModal={handleCloseModalEdit} />
      )}
      {articles.length > 0 ? (
        <Component
          sortedArticles={sortedArticles}
          columns={props.columns}
          sortBy={sortBy}
          handleSort={handleSort}
          handle
          rDelArticle={handlerDelArticle}
          handlerEdit={handlerEdit}
          setNewArticle={setNewArticle}
        />
      ) : (
        <div className='loader-container'>
          <LoaderComponent />
        </div>
      ) }
    </>
  )
}