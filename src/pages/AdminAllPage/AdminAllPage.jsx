import React from 'react'
// import Loader from '../../components/common/Loader/Loader'
import { TableHeader } from '../../components/common/table/TableHeader'
import { TableBody } from '../../components/common/table/TableBody'
import './AdminAllPage.scss'
import { useAdmin } from '../../hooks/useAdmin'

export const AdminAllPage = () => {
  const {
    columns,
    sortedArticles,
    handleSort,
    sortBy,
    handleDelArticle,
    handleEdit,
    setNewArticle
  } = useAdmin()
  return (
    <div className="admin-articles">
      <div className="admin-articles__header-block">
        <button className="btn" onClick={() => setNewArticle('addArt')}>
          Создать статью
        </button>
        <button className="btn">Download data</button>
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