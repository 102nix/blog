import React, { useState, useEffect, useReducer } from 'react'
import api from '../../api'
import LoaderComponent from '../common/Loader/Loader'
import _ from 'lodash'
import { ModalEdit } from '../ModalEdit/ModalEdit'
import Loader from 'react-loader-spinner'
import { reducer, initialState } from '../../state/state'

export const withAllAdmin = (Component) => (props) => {
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
  const [articleId, setArticleId] = useState(null)
  const [newArticle, setNewArticle] = useState(null)
  const [isLoader, setIsLoader] = useState(false)
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    (async () => {
      const articles = await api.articles.fetchAll()
      dispatch({ type: 'downloadAllArticles', articles })
    })()
  }, [])
  useEffect(() => {
    (async () => {
      const article = await api.articles.getById(articleId)
      dispatch({ type: 'downloadArticle', article })
      setIsLoader(false)
    })()
  }, [articleId]) // This articleID get's from handlerEdit(articleId)

  const submitEdit = async (e, data) => {
    e.preventDefault()
    console.log(data)
    let index = null
    state.articles.forEach(article => {
      if (article.id === data.id) index = data.id
    })
    if (index) {
      const newArts = state.articles.map(article => (article.id === data.id) ? { ...data } : article)
      await dispatch({ type: 'edit', payload: newArts })
      // учесть запись по API в backEnd
    } else {
      await dispatch({ type: 'add', data })
      // учесть запись по API в backEnd
    }
    handleCloseModalEdit()
  }
  const handlerEdit = (articleId) => {
    setArticleId(articleId)
    setIsLoader(true)
  }

  const handleCloseModalEdit = () => {
    setNewArticle(null)
    dispatch({ type: 'downloadArticle', article: null })
  }

  const sortedArticles = _.orderBy(state.articles, [sortBy.path], [sortBy.order])
  const handleSort = (item) => {
    setSortBy(item)
  }

  const handlerDelArticle = async (articleId) => {
    console.log(articleId)
    setIsLoader(true)
    const newArts = state.articles.filter(article => article.id !== articleId)
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
      {(state.article || newArticle === 'addArt') && (
        <ModalEdit article={state.article} onCloseModal={handleCloseModalEdit} submitEdit={submitEdit} />
      )}
      {state.articles ? (
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