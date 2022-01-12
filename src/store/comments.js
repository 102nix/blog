import { createSlice, createAction } from '@reduxjs/toolkit'
import commentsService from '../services/commentsService'
import httpService from '../services/http.service'
import { toast } from 'react-toastify'

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    currentArticle: null,
    isModal: false
  },
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true
    },
    commentsReceived: (state, action) => {
      state.entities = action.payload
      state.isLoading = false
    },
    commentsCreated: (state, action) => {
      state.entities.push(action.payload)
    },
    commentsUpdated: (state, action) => {
      state.entities = state.entities.map(a => {
        if (a.id === action.payload.id) return action.payload
        return a
      })
    },
    articleDeleted: (state, action) => {
      state.entities = state.entities.filter(a => a.id !== action.payload)
    },
    commentsRequestFiled: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    currentArticleReceived: (state, action) => {
      state.currentArticle = state.entities.filter(a => Number(a.id) === Number(action.payload))
    },
    currentArticleReseted: (state) => {
      state.currentArticle = null
    },
    regPageRequested: (state) => {
      state.isLoading = false
    },
    moduleOpened: (state) => {
      state.isModal = true
    },
    moduleClosed: (state) => {
      state.isModal = false
      state.currentArticle = null
    }
  }
})

const { reducer: commentsReducer, actions } = commentsSlice
const { commentsRequested, commentsReceived, commentsRequestFiled, currentArticleReceived, currentArticleReseted, commentsUpdated, regPageRequested, moduleClosed, moduleOpened, commentsCreated, articleDeleted } = actions

const updateArticleFailed = createAction('users/updateArticleFailed')
const deleteArticleFailed = createAction('users/deleteArticleFailed')

export const loadCommentsList = () => async (dispatch, getState) => {
  console.log('1) Loading comments....')
  dispatch(commentsRequested())
  try {
    console.log('2) Loading comments....')
    const { content } = await commentsService.get()
    console.log(content)
    dispatch(commentsReceived(content))
  } catch (error) {
    dispatch(commentsRequestFiled(error.message))
    toast(error.message)
  }
}

export const goCommentsListPage = () => (dispatch) => {
  dispatch(currentArticleReseted())
}

export const goRegPage = () => (dispatch) => {
  dispatch(regPageRequested())
}

export const getOpenArticle = (articleId) => (dispatch) => {
  console.log(articleId)
  dispatch(currentArticleReceived(articleId))
}

export const updateArticle = (e, val, dataUri, checkEdit, handleSnackbar) => async (dispatch) => {
  e.preventDefault()
  val.img = dataUri // not match with pattern-> const [data, setData] = useState({...}) + handleChange()
  val.date = new Date().toLocaleString() // see up
  try {
    const { data } = await httpService.put(`comments/${val.id}`, val)
    dispatch(moduleClosed())
    if (checkEdit === null) {
      dispatch(commentsCreated(data))
      handleSnackbar()
    } else {
      dispatch(commentsUpdated(data))
      handleSnackbar()
    }
  } catch (error) {
    updateArticleFailed(error.message)
    toast.error(error.message)
  }
}

export const editArticle = (articleId) => (dispatch) => {
  dispatch(moduleOpened())
  dispatch(currentArticleReceived(articleId))
}

export const setOpenModal = () => (dispatch) => {
  dispatch(moduleOpened())
}

export const setCloseModal = () => (dispatch) => {
  dispatch(moduleClosed())
}

export const delArticle = (articleId, handleSnackbar) => async (dispatch) => {
  try {
    await httpService.delete('comments/' + articleId)
    dispatch(articleDeleted(articleId))
    handleSnackbar()
  } catch (error) {
    deleteArticleFailed(error.message)
    toast.error(error.message)
  }
}

export const getComments = () => (state) => state.comments.entities
export const getCommentsLoadingStatus = () => (state) => state.comments.isLoading
export const getCurrentArticle = () => (state) => state.comments.currentArticle
export const getIsModal = () => (state) => state.comments.isModal

export default commentsReducer