import React, { useState, useEffect, useReducer, useContext } from 'react'
import LoaderComponent from '../components/common/Loader/Loader'
import Loader from 'react-loader-spinner'
import _ from 'lodash'
import { ModalEdit } from '../components/ModalEdit/ModalEdit'
import { reducer, initialState } from '../state/state'
import { ACTIONS } from '../state/constsAC'
import { getArticle, getAllArticles } from '../services/articleGeters'
import { columns } from '../static/sortData'

const AdminContext = React.createContext()

export const useAdmin = () => {
  return useContext(AdminContext)
}

export const AdminProvider = ({ children }) => {
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
  const [articleId, setArticleId] = useState(null)
  const [newArticle, setNewArticle] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    getAllArticles().then(articles => dispatch({ type: ACTIONS.FETCH_ARTICLES, articles }))
  }, [])

  useEffect(() => {
    getArticle(articleId, setIsLoading).then(article => dispatch({ type: ACTIONS.FETCH_ARTICLE, article }))
  }, [articleId]) // This articleID get's from handlerEdit(articleId)

  const submitEdit = async (e, data) => {
    e.preventDefault()
    console.log(isLoading)
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
    setIsLoading(true)
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
    setIsLoading(true)
    const newArts = state.articles.filter(article => article.id !== articleId)
    await dispatch({ type: 'delete', payload: newArts })
  }

  return (
    <AdminContext.Provider value={{ sortedArticles, columns, sortBy, handleSort, handlerDelArticle, handlerEdit, setNewArticle }}>
      {isLoading && (
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
      {state.articles ? children : <div className="loader-container"><LoaderComponent /></div>}
    </AdminContext.Provider>
  )
}