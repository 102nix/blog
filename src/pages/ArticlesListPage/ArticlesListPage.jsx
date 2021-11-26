import React from 'react'
// import { useHistory } from 'react-router-dom'
import { SubTitle } from '../../components/common/typografy/SubTitle'
import { useStore } from '../../hooks/useStore'
import { Grid, Card, CardMedia, CardContent, Button, Typography, CardActions } from '@material-ui/core'
// import './ArticlesList.scss'

export const ArticlesListPage = () => {
  const { articles, blog, handleOpenArticle } = useStore()
  return (
    <>
      {blog === null &&
        <>
          <SubTitle>Статьи</SubTitle>
          <Grid container spacing={4}>
            {articles.map(article => (
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
                    <Typography variant="body2" color="text.secondary">
                      {article.article.slice(0, 59)}...
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" onClick={() => handleOpenArticle(article.id)}>
                      Открыть
                    </Button>
                  </CardActions>
                </Card>

              </Grid>
            ))}
          </Grid>
        </>
      }
    </>
  )
}