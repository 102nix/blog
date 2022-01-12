import React from 'react'
import { SubTitle } from '../components/common/typografy/SubTitle'
import { Grid, Card, CardMedia, CardContent, Button, Typography, CardActions } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { getArticles, getOpenArticle } from '../store/articles'
import { useHistory } from 'react-router-dom'
import _ from 'lodash'

export const ArticlesListPage = () => {
  const articles = useSelector(getArticles())
  const dispatch = useDispatch()
  const history = useHistory()
  const sortedArticles = _.orderBy(articles, ['date'], ['desc'])
  const openArticle = (id) => {
    history.push(`/articles/${id}`)
    dispatch(getOpenArticle(id))
  }
  return (
    <>
      <SubTitle>Статьи</SubTitle>
      <Grid container spacing={4}>
        {sortedArticles.map(article => (
          <Grid item key={article.id} xs={ 12 } md={ 4 }>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="150px"
                image={article.img}
                alt=""
              />
              <CardContent sx={{ p: 0 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {article.title}
                </Typography>
                <Typography variant="body2">
                  {article.article.slice(0, 59)}...
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={() => openArticle(article.id) }>
                  Открыть
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}