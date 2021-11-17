import React, { useState, useContext } from 'react'
// import Loader from 'react-loader-spinner'
import _ from 'lodash'
import { ModalEdit } from '../components/ModalEdit/ModalEdit'
import { ACTIONS } from '../state/constsAC'
import { useStore } from './useStore'
import { columns } from '../static/sortData'
import { ModalDownload } from '../components/ModalDownload/ModalDownload'
import httpService from '../services/http.service'
import { toast } from 'react-toastify'

const AdminContext = React.createContext()

export const useAdmin = () => {
  return useContext(AdminContext)
}

export const AdminProvider = ({ children }) => {
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
  const [newArticle, setNewArticle] = useState(null)
  const [isDownload, setIsDownload] = useState(false)
  const { articles, blog, getArticle, getAllArticles, dispatch, setIsLoading } = useStore()

  const submitEdit = async (e, data, dataUri) => {
    e.preventDefault()
    setIsLoading(false)
    data.img = dataUri
    let index = null
    articles.forEach(article => {
      if (article.id === data.id) index = data.id
    })
    if (index) {
      try {
        await httpService.put('articles/' + data.id, data)
        setIsLoading(true)
      } catch (error) {
        console.log(error)
        toast.error(error)
      }
    } else {
      try {
        const res = await httpService.put('articles/' + data.id, data)
        console.log(res)
        setIsLoading(true)
      } catch (error) {
        console.log(error)
        toast.error(error)
      }
    }
    getAllArticles()
    handleCloseModalEdit()
  }

  const handleEdit = (articleId) => {
    getArticle(articleId)
    setIsLoading(true)
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
    try {
      await httpService.delete('articles/' + articleId)
      getAllArticles()
      setIsLoading(true)
    } catch (error) {
      console.log(error)
      toast.error(error)
    }
  }

  const setDownloadFB = () => {
    setIsDownload(true)
  }

  return (
    <AdminContext.Provider value={{ sortedArticles, columns, sortBy, handleSort, handleDelArticle, handleEdit, setNewArticle, setDownloadFB }}>
      {(blog || newArticle === 'addArt') && (
        <ModalEdit article={blog} onCloseModal={handleCloseModalEdit} submitEdit={submitEdit} />
      )}
      {isDownload &&
        <ModalDownload />
      }
      {children }
    </AdminContext.Provider>
  )
}