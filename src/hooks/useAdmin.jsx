import React, { useState, useContext } from 'react'
// import Loader from 'react-loader-spinner'
import _ from 'lodash'
import { ModalEdit } from '../components/ModalEdit/ModalEdit'
import { useStore } from './useStore'
import { columns } from '../static/sortData'
import { ModalDownload } from '../components/ModalDownload/ModalDownload'
import httpService from '../services/http.service'
import { toast } from 'react-toastify'
import { ACTIONS } from '../state/constsAC'

const AdminContext = React.createContext()

export const useAdmin = () => {
  return useContext(AdminContext)
}

export const AdminProvider = ({ children }) => {
  const [sortBy, setSortBy] = useState({ path: 'date', order: 'desc' })
  const [newArticle, setNewArticle] = useState(null)
  const [isDownload, setIsDownload] = useState(false)
  const { articles, blog, getArticle, getAllArticles, setIsLoading, dispatch } = useStore()

  const submitEdit = async (e, data, dataUri) => {
    e.preventDefault()
    data.img = dataUri // not match with pattern-> const [data, setData] = useState({...}) + handleChange()
    data.date = new Date().toLocaleString() // see up
    try {
      await httpService.put('articles/' + data.id, data)
    } catch (error) {
      console.log(error)
      toast.error(error)
    }
    getAllArticles()
    handleCloseModalEdit()
  }

  const handleEdit = (articleId) => {
    console.log(articleId)
    getArticle(articleId)
    setIsLoading(true)
  }

  const handleCloseModalEdit = () => {
    setNewArticle(null)
    dispatch({ type: ACTIONS.CLOSE_ARTICLE })
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
    setIsDownload(prevState => !prevState)
  }

  const values = {
    sortedArticles,
    columns,
    sortBy,
    handleSort,
    handleDelArticle,
    handleEdit,
    setNewArticle,
    setDownloadFB
  }
  return (
    <AdminContext.Provider value={values}>
      {(blog || newArticle === 'addArt') && (
        <ModalEdit article={blog} onCloseModal={handleCloseModalEdit} submitEdit={submitEdit} />
      )}
      {isDownload &&
        <ModalDownload setDownloadFB={setDownloadFB} isDownload={isDownload} />
      }
      {children }
    </AdminContext.Provider>
  )
}