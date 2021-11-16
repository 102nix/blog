import React, { useState, useContext } from 'react'
// import Loader from 'react-loader-spinner'
import _ from 'lodash'
import { ModalEdit } from '../components/ModalEdit/ModalEdit'
import { ACTIONS } from '../state/constsAC'
import { useStore } from './useStore'
import { columns } from '../static/sortData'

const AdminContext = React.createContext()

export const useAdmin = () => {
  return useContext(AdminContext)
}

export const AdminProvider = ({ children }) => {
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
  const [newArticle, setNewArticle] = useState(null)
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

  const handleEdit = (articleId) => {
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

  const handleDelArticle = async (articleId) => {
    console.log(articleId)
    setIsLoading(true)
    const newArts = articles.filter(article => article.id !== articleId)
    await dispatch({ type: 'delete', payload: newArts })
  }

  return (
    <AdminContext.Provider value={{ sortedArticles, columns, sortBy, handleSort, handleDelArticle, handleEdit, setNewArticle }}>
      {(blog || newArticle === 'addArt') && (
        <ModalEdit article={blog} onCloseModal={handleCloseModalEdit} submitEdit={submitEdit} />
      )}
      { children }
    </AdminContext.Provider>
  )
}