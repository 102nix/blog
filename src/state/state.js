import { ACTIONS } from './constsAC'

export const initialState = {
  articles: null,
  mainInfo: null,
  article: null
}

export function reducer (state, action) {
  switch (action.type) {
  case ACTIONS.FETCH_ARTICLES:
    return {
      ...state,
      articles: action.content,
      article: null
    }
  case ACTIONS.FETCH_ARTICLE:
    return {
      ...state,
      article: action.content
    }
  case ACTIONS.CLOSE_ARTICLE:
    return {
      ...state,
      article: null
    }
  case ACTIONS.FETCH_MAININFO:
    return {
      ...state,
      mainInfo: action.mainInfo
    }
  case 'add':
    return {
      ...state,
      articles: [...state.articles, action.data]
    }
  case 'delete':
    return {
      ...state,
      articles: [...action.payload]
    }
  case 'edit':
    return {
      ...state,
      articles: [...action.payload]
    }
  default:
    return state
  }
}