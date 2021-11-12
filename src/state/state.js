import { ACTIONS } from './constsAC'

export const initialState = {
  articles: null,
  mainInfo: null,
  article: null
}

export function reducer (state, action) {
  console.log(state, action)
  switch (action.type) {
  case ACTIONS.FETCH_ARTICLES:
    return {
      ...state,
      articles: action.allArticles,
      article: null,
      mainInfo: null
    }
  case ACTIONS.FETCH_ARTICLE:
    return {
      ...state,
      article: action.article,
      articles: null,
      mainInfo: null
    }
  case ACTIONS.CLOSE_ARTICLE:
    return {
      ...state,
      article: null
    }
  case ACTIONS.FETCH_MAININFO:
    return {
      ...state,
      mainInfo: action.startInfo,
      article: null,
      articles: null
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