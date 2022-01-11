import React, { useState } from 'react'
import { TableHeader } from '../components/common/table/TableHeader'
import { TblBody } from '../components/common/table/TableBody'
import { Button, TableContainer, Paper, Table } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'
import { delArticle, editArticle, getArticles, setOpenModal } from '../store/articles'
import { columns } from '../static/sortData'
import _ from 'lodash'
import { ModalEdit } from '../components/ModalEdit'
import Snackbar from '@mui/material/Snackbar'

const useStyles = makeStyles((theme) => ({
  rootAdmin: {
    width: 'inherit',
    marginBottom: theme.spacing(4)
  },
  blockActions: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '10px auto 10px',
    width: '100%'
  },
  table: {
    width: '100%'
  }
}))

export const AdminAllPage = () => {
  const classes = useStyles()
  const [sortBy, setSortBy] = useState({ path: 'date', order: 'desc' })
  const [snackbar, setSnackbar] = useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'left'
  })
  const dispatch = useDispatch()
  const articles = useSelector(getArticles())
  const sortedArticles = _.orderBy(articles, [sortBy.path], [sortBy.order])
  const handleSort = (item) => {
    setSortBy(item)
  }

  const handleSnackbar = () => {
    setSnackbar({ ...snackbar, open: !open })
  }
  const { vertical, horizontal, open } = snackbar

  return (

    <div className={classes.rootAdmin}>
      <div className={classes.blockActions} component="div">
        <Button variant="contained" endIcon={<CreateIcon />} onClick={() => dispatch(setOpenModal())}>
          Создать статью
        </Button>
        {/* <Button variant="contained" component="span" onClick={setDownloadFB}>
          Upload
        </Button> */}
      </div>
      <ModalEdit handleSnackbar={handleSnackbar}/>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHeader
            onSort={handleSort}
            selectedSort={sortBy}
            columns={columns}
          />
          <TblBody
            columns={columns}
            data={sortedArticles}
            onDelete={(id) => dispatch(delArticle(id, handleSnackbar))}
            onEdit={(id) => dispatch(editArticle(id))}
          />
        </Table>
      </TableContainer>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleSnackbar}
        key={vertical + horizontal}
        autoHideDuration={2500}
        message={'Готово!'}
      />
    </div>)
}