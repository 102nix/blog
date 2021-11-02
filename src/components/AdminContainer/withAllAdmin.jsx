import React, { useState, useEffect, useReducer } from 'react'
import api from '../../api'
import LoaderComponent from '../common/Loader/Loader'
import _ from 'lodash'
import { ModalEdit } from '../ModalEdit/ModalEdit'
import Loader from 'react-loader-spinner'
import { reducer, initialState } from '../../api/fake.api/articles.api'

export const withAllAdmin = (Component) => (props) => {
  const [articles, setArticles] = useState([])
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
  const [article, setArticle] = useState(null)
  const [articleId, setArticleId] = useState(null)
  const [newArticle, setNewArticle] = useState(null)
  const [isLoader, setIsLoader] = useState(false)
  const [state, dispatch] = useReducer(reducer, initialState)

  console.log('Locking for state: ', state)

  function arrayСompare (articles, state) {
    if (articles.length !== state.length) return false
    for (let i = 0; i < articles.length; i++) {
      if (articles[i] !== state[i]) return false
    }
    return true
  }

  useEffect(() => {
    api.articles.fetchAll().then((data) => {
      setIsLoader(false)
      if (arrayСompare(data, state)) {
        return setArticles(data)
      } else {
        return setArticles(state.articles)
      }
    })
  }, [state])

  useEffect(() => {
    api.articles.getById(articleId).then((data) => {
      setIsLoader(false)
      setArticle(data)
    })
  }, [articleId]) // This articleID get's from handlerEdit(articleId)

  const submitEdit = async (e, data) => {
    e.preventDefault()
    console.log(data)
    const newArts = articles.map(article => (article.id === data.id) ? { ...data } : article)
    await dispatch({ type: 'edit', payload: newArts })
    handleCloseModalEdit()
  }

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

  const handlerDelArticle = async (articleId) => {
    console.log(articleId)
    setIsLoader(true)
    const newArts = articles.filter(article => article.id !== articleId)
    await dispatch({ type: 'delete', payload: newArts })
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
        <ModalEdit article={article} onCloseModal={handleCloseModalEdit} submitEdit={submitEdit} />
      )}
      {articles.length > 0 ? (
        <Component
          sortedArticles={sortedArticles}
          columns={props.columns}
          sortBy={sortBy}
          handleSort={handleSort}
          handle
          DelArticle={handlerDelArticle}
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