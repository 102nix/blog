import React from 'react'
import './ModalDownload.scss'
import { SubTitle } from '../common/typografy/SubTitle'
import { useMockData } from '../../hooks/useMockData'

export const ModalDownload = () => {
  const { error, initialize, progress, status } = useMockData()
  const handleClick = () => {
    initialize()
  }
  return (
    <div className="modal-window">
      <div className="modal_container">
        <SubTitle>Выгрузка в Firebase</SubTitle>
        <ul>
          <li>Status: {status}</li>
          <li>Progress: {progress}%</li>
          { error && <li>Error: {error}</li> }
        </ul>
        <button className="btn btn-primary" onClick={handleClick}>Инициализировать</button>
      </div>
    </div>
  )
}