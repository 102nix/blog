import React from 'react'
import { TableHeader } from '../components/common/table/TableHeader'
import { TblBody } from '../components/common/table/TableBody'
import { useAdmin } from '../hooks/useAdmin'
import { Button, TableContainer, Paper, Table } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import { makeStyles } from '@material-ui/core/styles'

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
  const {
    columns,
    sortedArticles,
    handleSort,
    sortBy,
    handleDelArticle,
    handleEdit,
    setNewArticle
    // setDownloadFB
  } = useAdmin()
  return (
    <div className={classes.rootAdmin}>
      <div className={classes.blockActions} component="div">
        <Button variant="contained" endIcon={<CreateIcon />} onClick={() => setNewArticle('addArt')}>
          Создать статью
        </Button>
        {/* <Button variant="contained" component="span" onClick={setDownloadFB}>
          Upload
        </Button> */}
      </div>
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
            onDelete={handleDelArticle}
            onEdit={handleEdit}
          />
        </Table>
      </TableContainer>
    </div>)
}