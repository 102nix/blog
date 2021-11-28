import React from 'react'
// import Loader from '../../components/common/Loader/Loader'
import { TableHeader } from '../../components/common/table/TableHeader'
import { TblBody } from '../../components/common/table/TableBody'
// import './AdminAllPage.scss'
import { useAdmin } from '../../hooks/useAdmin'
import { Button, TableContainer, Paper, Table, Box } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  rootAdmin: {
    width: 'inherit',
    marginBottom: '15px'
  },
  blockActions: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '10px auto 10px',
    width: '100%'
  },
  blockTable: {
    backgroundColor: 'grey'
  },
  table: {
    width: '100%'
  }
}))

export const AdminAllPage = () => {
  const classes = useStyles()
  const {
    columns,
    sortedArticles,
    handleSort,
    sortBy,
    handleDelArticle,
    handleEdit,
    setNewArticle,
    setDownloadFB
  } = useAdmin()
  return (
    <Box className={classes.rootAdmin} component="div">
      <Box className={classes.blockActions} component="div">
        <Button variant="contained" endIcon={<CreateIcon />} onClick={() => setNewArticle('addArt')}>
          Создать статью
        </Button>
        <Button variant="contained" component="span" onClick={setDownloadFB}>
          Upload
        </Button>
      </Box>
      <TableContainer component={Paper} className={classes.blockTable}>
        <Table className={classes.table} aria-label="simple table">
          <TableHeader
            onSort={handleSort}
            selectedSort={sortBy}
            columns={columns}
            classN={classes.table}
          />
          <TblBody
            columns={columns}
            data={sortedArticles}
            onDelete={handleDelArticle}
            onEdit={handleEdit}
          />
        </Table>
      </TableContainer>
    </Box>)
}