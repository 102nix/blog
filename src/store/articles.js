import { createSlice, createAction } from '@reduxjs/toolkit'
import articlesService from '../services/articlesService'
import httpService from '../services/http.service'
import { toast } from 'react-toastify'

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null,
    currentArticle: null,
    isModal: false
  },
  reducers: {
    articlesRequested: (state) => {
      state.isLoading = true
    },
    articlesReceived: (state, action) => {
      state.entities = action.payload
      state.lastFetch = Date.now()
      state.isLoading = false
    },
    articleCreated: (state, action) => {
      state.entities.push(action.payload.content)
    },
    articleUpdated: (state, action) => {
      state.entities = state.entities.map(a => {
        if (a.id === action.payload.content.id) return action.payload.content
        return a
      })
    },
    articleDeleted: (state, action) => {
      state.entities = state.entities.filter(a => a.id !== action.payload)
    },
    articlesRequestFiled: (state, action) => {
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

const { reducer: articlesReducer, actions } = articlesSlice
const { articlesRequested, articlesReceived, articlesRequestFiled, currentArticleReceived, currentArticleReseted, articleCreated, articleUpdated, regPageRequested, moduleClosed, moduleOpened, articleDeleted } = actions

const deleteArticleFailed = createAction('users/deleteArticleFailed')
const createArticleRequested = createAction('users/createArticleRequested')
const createArticleFailed = createAction('users/createArticleFailed')
const updateArticleRequested = createAction('users/updateArticleRequested')
const updaterticleFailed = createAction('users/updateArticleFailed')

function isOutDated (date) {
  if (Date.now() - date > 10 * 60 * 100) {
    return true
  }
  return false
}

export const loadArticlesList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().articles
  if (isOutDated(lastFetch)) {
    dispatch(articlesRequested())
    try {
      const { content } = await articlesService.get()
      dispatch(articlesReceived(content))
    } catch (error) {
      dispatch(articlesRequestFiled(error.message))
      toast(error.message)
    }
  }
}

export const goArticlesListPage = () => (dispatch) => {
  dispatch(currentArticleReseted())
}

export const goRegPage = () => (dispatch) => {
  dispatch(regPageRequested())
}

export const getOpenArticle = (articleId) => (dispatch) => {
  console.log(articleId)
  dispatch(currentArticleReceived(articleId))
}

export const createArticle = (val, handleSnackbar) => async (dispatch) => {
  dispatch(createArticleRequested())
  try {
    const { data } = await httpService.put(`articles/${val.id}`, val)
    dispatch(moduleClosed())
    dispatch(articleCreated(data))
    handleSnackbar()
  } catch (error) {
    dispatch(createArticleFailed(error.message))
    toast.error(error.message)
  }
}

export const updateArticle = (val, handleSnackbar) => async (dispatch) => {
  dispatch(updateArticleRequested())
  try {
    const { data } = await httpService.put(`articles/${val.id}`, val)
    dispatch(moduleClosed())
    dispatch(articleUpdated(data))
    handleSnackbar()
  } catch (error) {
    dispatch(updaterticleFailed(error.message))
    toast.error(error.message)
  }
}

export const delArticle = (articleId, handleSnackbar) => async (dispatch) => {
  try {
    await httpService.delete('articles/' + articleId)
    dispatch(articleDeleted(articleId))
    handleSnackbar()
  } catch (error) {
    deleteArticleFailed(error.message)
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

export const getArticles = () => (state) => state.articles.entities
export const getArticlesLoadingStatus = () => (state) => state.articles.isLoading
export const getCurrentArticle = () => (state) => state.articles.currentArticle
export const getIsModal = () => (state) => state.articles.isModal

export default articlesReducer