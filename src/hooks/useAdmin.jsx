import React, { useState, useContext } from 'react'
import _ from 'lodash'
import { ModalEdit } from '../components/ModalEdit'
import { useStore } from './useStore'
import { columns } from '../static/sortData'
import { ModalDownload } from '../components/ModalDownload'
import httpService from '../services/http.service'
import { toast } from 'react-toastify'
import { ACTIONS } from '../state/constsAC'
import SimpleSnackbar from '../components/common/Snackbar'
// import { getUserId } from '../services/localStorage.service'

const AdminContext = React.createContext()

export const useAdmin = () => {
  return useContext(AdminContext)
}

export const AdminProvider = ({ children }) => {
  const [sortBy, setSortBy] = useState({ path: 'date', order: 'desc' })
  const [newArticle, setNewArticle] = useState(null)
  const [isDownload, setIsDownload] = useState(false)
  const { articles, getArticle, getAllArticles, setIsLoading, dispatch } = useStore()
  const [open, setOpen] = useState(false)
  const [textSnackBar, setTextSnackBar] = useState('')

  const handleSnackbar = (text) => {
    setOpen(true)
    setTextSnackBar(text)
  }

  const submitEdit = async (e, data, dataUri) => {
    e.preventDefault()
    data.img = dataUri // not match with pattern-> const [data, setData] = useState({...}) + handleChange()
    data.date = new Date().toLocaleString() // see up
    try {
      // const userId = getUserId()
      await httpService.put(`articles/${data.id}`, data)
      getAllArticles().then(() => handleSnackbar('Статьи обновлены!'))
      handleCloseModalEdit()
    } catch (error) {
      console.log(error)
      toast.error(error)
    }
  }

  const handleEdit = (articleId) => {
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
      getAllArticles().then(() => handleSnackbar('Статья удалена!'))
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
    isDownload,
    setDownloadFB,
    submitEdit,
    newArticle,
    handleCloseModalEdit,
    open,
    handleClose: () => setOpen(false),
    textSnackBar
  }
  return (
    <AdminContext.Provider value={values}>
      <ModalEdit />
      <ModalDownload/>
      { children }
      <SimpleSnackbar />
    </AdminContext.Provider>
  )
}