import React, { useState } from 'react'
import { Grid, Card, CardMedia, CardContent, Button, Typography, CardActions, Box } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { getArticles, getOpenArticle } from '../store/articles'
import { useHistory } from 'react-router-dom'
import _ from 'lodash'
import { Markup } from 'interweave'
import { SearchArticleComponent } from '../components/SearchArticleComponent'

export const ArticlesListPage = () => {
  const articles = useSelector(getArticles())
  const dispatch = useDispatch()
  const history = useHistory()
  const [searchArticle, setSearchArticle] = useState('')
  const [findArticleArr, setFindArticleArr] = useState(null)
  const sortedArticles = _.orderBy(findArticleArr || articles, ['date'], ['desc'])
  const openArticle = (id) => {
    history.push(`/articles/${id}`)
    dispatch(getOpenArticle(id))
  }
  return (
    <>
      <Box sx={{ marginTop: '10px', marginBottom: '15px' }}>
        <SearchArticleComponent
          searchArticle={searchArticle}
          setSearchArticle={setSearchArticle}
          articles={articles}
          setFindArticleArr={setFindArticleArr}
        />
      </Box>
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
                  <Markup content={article.article.slice(0, 59).replace(/<[^>]+>/g, '')}/>...
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