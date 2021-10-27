import React from "react"
import Loader from "../../components/common/Loader/Loader"
import { TableHeader } from "../../components/common/Table/TableHeader"
import { TableBody } from "../../components/common/Table/TableBody"
import { useHistory } from "react-router"

export const AdminAllPage = ({ columns, sortedArticles, handleSort, sortBy, handlerDelArticle, handlerEdit }) => {
  
  const history = useHistory()

  console.log('columns: ', columns, sortedArticles, handleSort, sortBy, handlerDelArticle, handlerEdit)

  return (
    <div className="admin-articles">
      <div className="admin-articles__header-block">
        <button className="btn" onClick={() => history.push("/addarticle")}>
          Создать статью
        </button>
      </div>
      {columns !== {} ? (
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
