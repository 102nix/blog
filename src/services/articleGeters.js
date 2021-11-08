import articleService from './articleService'

export const getAllArticles = async () => {
  try {
    const allArticles = await articleService.fetchAllArticles()
    return allArticles
  } catch (error) {
    console.log(error)
  }
}
export const getArticle = async (articleId, setIsLoader) => {
  try {
    const article = await articleService.fetchArticle(articleId)
    if (setIsLoader) setIsLoader(false)
    return article
  } catch (error) {
    console.log(error)
  }
}