import React, { useState, useContext } from 'react'
// import LoaderComponent from '../components/common/Loader/Loader'
import Loader from 'react-loader-spinner'
import _ from 'lodash'
import { ModalEdit } from '../components/ModalEdit/ModalEdit'
import { ACTIONS } from '../state/constsAC'
// import { getArticle, getAllArticles } from '../services/articleGeters'
import { useStore } from './useStore'
import { columns } from '../static/sortData'

const AdminContext = React.createContext()

export const useAdmin = () => {
  return useContext(AdminContext)
}

export const AdminProvider = ({ children }) => {
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
  // const [articleId, setArticleId] = useState(null)
  const [newArticle, setNewArticle] = useState(null)
  // const [isLoading, setIsLoading] = useState(false)
  const { articles, blog, getArticle, dispatch, isLoading, setIsLoading } = useStore()

  const submitEdit = async (e, data) => {
    e.preventDefault()
    console.log(isLoading)
    let index = null
    articles.forEach(article => {
      if (article.id === data.id) index = data.id
    })
    if (index) {
      const newArts = articles.map(article => (article.id === data.id) ? { ...data } : article)
      await dispatch({ type: 'edit', payload: newArts })
      // учесть запись по API в backEnd
    } else {
      await dispatch({ type: 'add', data })
      // учесть запись по API в backEnd
    }
    handleCloseModalEdit()
  }

  const handlerEdit = (articleId) => {
    getArticle(articleId)
    setIsLoading(false)
  }

  const handleCloseModalEdit = () => {
    setNewArticle(null)
    dispatch({ type: ACTIONS.FETCH_ARTICLE, article: null })
    setIsLoading(true)
  }

  const sortedArticles = _.orderBy(articles, [sortBy.path], [sortBy.order])
  const handleSort = (item) => {
    setSortBy(item)
  }

  const handlerDelArticle = async (articleId) => {
    console.log(articleId)
    setIsLoading(true)
    const newArts = articles.filter(article => article.id !== articleId)
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
      {(blog || newArticle === 'addArt') && (
        <ModalEdit article={blog} onCloseModal={handleCloseModalEdit} submitEdit={submitEdit} />
      )}
      { !isLoading ? children : <div className="loader-container"><Loader /></div> }
    </AdminContext.Provider>
  )
}