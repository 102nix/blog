import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Grid, Card, CardMedia, CardContent, Button, Typography, CardActions, Box } from '@material-ui/core'
import { getOpenArticle } from '../store/articles'
// import _ from 'lodash'
import { Markup } from 'interweave'
import { SearchArticleComponent } from '../components/SearchArticleComponent'
import { useArticles } from '../hooks/useArticles'
// import Pagination from '@mui/material/Pagination'
// import { paginate } from '../static/paginate'
import Pagination from '@mui/material/Pagination'

export const ArticlesListPage = () => {
  // const articles = useSelector(getArticles())
  const dispatch = useDispatch()
  const history = useHistory()
  // const [findArticleArr, setFindArticleArr] = useState(null)
  // const sortedArticles = _.orderBy(findArticleArr || articles, ['date'], ['desc'])
  // const pageSize = 3
  // const count = Math.ceil(sortedArticles.length / pageSize)
  // const [page, setPage] = useState(1)
  // const handleChange = (event, value) => {
  //   console.log(value)
  //   setPage(value)
  // }
  // const articlesPaginate = paginate(sortedArticles, page, pageSize)
  const { articles, setFindArticleArr, articlesPaginate, count, handleChange, page } = useArticles()
  const openArticle = (id) => {
    history.push(`/articles/${id}`)
    dispatch(getOpenArticle(id))
  }
  return (
    <>
      <Box sx={{ marginTop: '10px', marginBottom: '15px' }}>
        <SearchArticleComponent
          articles={articles}
          setFindArticleArr={setFindArticleArr}
        />
      </Box>
      <Grid container spacing={4} >
        {articlesPaginate.map(a => (
          <Grid item key={a.id} xs={ 12 } md={ 4 }>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="150px"
                image={a.img}
                alt=""
              />
              <CardContent sx={{ p: 0 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {a.title}
                </Typography>
                <Typography variant="body2">
                  <Markup content={a.article.slice(0, 59)}/>...
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={() => openArticle(a.id) }>
                  Открыть
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ marginTop: '15px', display: 'flex', justifyContent: 'center' }} >
        <Pagination count={count} page={page} onChange={handleChange} />
      </Box>
    </>
  )
}