export function prepareComments (comments, idArticle) {
  console.log(comments, idArticle)
  const resultComments = []
  comments.forEach(c => {
    if (Number(c.articleId) === Number(idArticle)) resultComments.push(c)
  })
  return resultComments
}