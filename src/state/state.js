
export const initialState = {
  articles: null,
  mainInfo: null,
  article: null
}

export function reducer (state, action) {
  console.log(state, action)
  switch (action.type) {
  case 'downloadAllArticles':
    return {
      ...state,
      articles: action.articles
    }
  case 'downloadArticle':
    return {
      ...state,
      article: action.article
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