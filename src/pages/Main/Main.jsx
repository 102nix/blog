import React, { useEffect, useState } from 'react'
import api from '../../api'
import Loader from '../../components/Loader/Loader'
import { MainComponent } from '../../components/MainComponent/MainComponent'
import './Main.scss'


export const Main = () => {

  const [mainInfo, setMainInfo] = useState([])
  
  useEffect(() => {
    api.articles.fetchAllMain().then(data => setMainInfo(data))
  }, [])
  
  return (
    <div className="main-container">
      <h3>Статьи, посвещенные Frontend-у: ReactJS, JS, ...</h3>
      <div className="main-container__body">
        {mainInfo.length !== 0 ? (
          <MainComponent mainInfo={mainInfo} />
          ) : (
          <div className="loader-container">
            <Loader />
          </div>          
          )
        }
      </div>
    </div>
  )
}