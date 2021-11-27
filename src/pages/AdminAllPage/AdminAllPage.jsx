import React from 'react'
// import Loader from '../../components/common/Loader/Loader'
import { TableHeader } from '../../components/common/table/TableHeader'
import { TableBody } from '../../components/common/table/TableBody'
import './AdminAllPage.scss'
import { useAdmin } from '../../hooks/useAdmin'
import { Button } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'

export const AdminAllPage = () => {
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
    <div className="admin-articles">
      <div className="admin-articles__header-block">
        <Button variant="contained" endIcon={<CreateIcon />} onClick={() => setNewArticle('addArt')}>
          Создать статью
        </Button>
        <Button variant="contained" component="span" onClick={setDownloadFB}>
          Upload
        </Button>
      </div>

      <table className="table">
        <TableHeader
          onSort={handleSort}
          selectedSort={sortBy}
          columns={columns}
        />
        <TableBody
          columns={columns}
          data={sortedArticles}
          onDelete={handleDelArticle}
          onEdit={handleEdit}
        />
      </table>
    </div>)
}