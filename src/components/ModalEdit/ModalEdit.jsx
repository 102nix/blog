import React from 'react'
import { useHistory } from 'react-router-dom'
import './ModalEdit.scss'
import { SubTitle } from '../common/typografy/SubTitle'
import { AddArticleForm } from '../ui/AddArticleForm'

export const ModalEdit = ({ article, onCloseModal }) => {

  const history = useHistory()

  return (
    <div className="modal-window">
      <div className="modal_container">
        <SubTitle>Редактирование</SubTitle>
        <AddArticleForm article={article} onCloseModal={onCloseModal} />
      </div>
    </div>
  )
}
