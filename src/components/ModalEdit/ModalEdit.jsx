import React from 'react'
import { useHistory } from 'react-router-dom'
import { EditArticleForm } from '../ui/EditArticleForm'
import './ModalEdit.scss'
import { SubTitle } from '../common/typografy/SubTitle'

export const ModalEdit = ({ article, onCloseModal }) => {

  const history = useHistory()

  return (
    <div className="modal-window">
      <div className="modal_container">
        <SubTitle>Редактирование</SubTitle>
        <EditArticleForm article={article} onCloseModal={onCloseModal} />
      </div>
    </div>
  )
}
