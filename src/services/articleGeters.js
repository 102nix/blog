import articleService from './articleService'

export const getAllArticles = async () => {
  console.log('Getter for articles')
  try {
    const allArticles = await articleService.fetchAllArticles()
    return allArticles
  } catch (error) {
    console.log(error)
  }
}
export const getArticle = async (articleId) => {
  try {
    const article = await articleService.fetchArticle(articleId)
    return article
  } catch (error) {
    console.log(error)
  }
}