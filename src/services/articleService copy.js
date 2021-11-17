import api from '../api'

const articleService = {
  fetchAllArticles: async () => {
    const articles = await api.articles.fetchAll()
    return articles
  },
  fetchArticle: async (articleId) => {
    const article = await api.articles.getById(articleId)
    return article
  }
}

export default articleService