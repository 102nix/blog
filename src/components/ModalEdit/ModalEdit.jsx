import React from 'react'
import './ModalEdit.scss'
import { SubTitle } from '../common/typografy/SubTitle'
import { AddArticleForm } from '../ui/AddArticleForm'

export const ModalEdit = ({ article, onCloseModal }) => {
  return (
    <div className="modal-window">
      <div className="modal_container">
        <SubTitle>Редактирование</SubTitle>
        <AddArticleForm article={article} onCloseModal={onCloseModal} />
      </div>
    </div>
  )
}