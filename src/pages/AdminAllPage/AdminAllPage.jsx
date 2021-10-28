import React from "react"
import Loader from "../../components/common/Loader/Loader"
import { TableHeader } from "../../components/common/table/TableHeader"
import { TableBody } from "../../components/common/table/TableBody"
import { useHistory } from "react-router"

export const AdminAllPage = ({ columns, sortedArticles, handleSort, sortBy, handlerDelArticle, handlerEdit, setNewArticle }) => {
  
  const history = useHistory()

  return (
    <div className="admin-articles">
      <div className="admin-articles__header-block">
        <button className="btn" onClick={() => setNewArticle('addArt')}>
          Создать статью
        </button>
      </div>
      {columns? (
        <table className="table">
          <TableHeader
            onSort={handleSort}
            selectedSort={sortBy}
            columns={columns}
          />
          <TableBody
            columns={columns}
            data={sortedArticles}
            onDelete={handlerDelArticle}
            onEdit={handlerEdit}
          />
        </table>
      ) : (
        <div className="loader-container">
          <Loader />
        </div>
      )}
    </div>)
}
