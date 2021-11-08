import React, { useState, useEffect, useReducer } from 'react'
import LoaderComponent from '../common/Loader/Loader'
import _ from 'lodash'
import { ModalEdit } from '../ModalEdit/ModalEdit'
import Loader from 'react-loader-spinner'
import { reducer, initialState } from '../../state/state'
import { ACTIONS } from '../../state/constsAC'
// import articleService from '../../services/articleService'
import { getArticle, getAllArticles } from '../../services/articleGeters'

export const withAllAdmin = (Component) => (props) => {
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
  const [articleId, setArticleId] = useState(null)
  const [newArticle, setNewArticle] = useState(null)
  const [isLoader, setIsLoader] = useState(false)
  const [state, dispatch] = useReducer(reducer, initialState)

  // const getAllArticles = async () => {
  //   try {
  //     const allArticles = await articleService.fetchAllArticles()
  //     return allArticles
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // const getArticle = async (articleId) => {
  //   try {
  //     const article = await articleService.fetchArticle(articleId)
  //     setIsLoader(false)
  //     return article
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  useEffect(() => {
    getAllArticles().then(articles => dispatch({ type: ACTIONS.FETCH_ARTICLES, articles }))
  }, [])
  useEffect(() => {
    getArticle(articleId, setIsLoader).then(article => dispatch({ type: ACTIONS.FETCH_ARTICLE, article }))
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
    dispatch({ type: ACTIONS.FETCH_ARTICLE, article: null })
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