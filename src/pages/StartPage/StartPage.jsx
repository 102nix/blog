import React from 'react'
import { SubTitle } from '../../components/common/typografy/SubTitle'
import './StartPage.scss'

export const StartPage = ({ startInfo }) => {
  return (
    <div className="start-container">
      <SubTitle>Статьи, посвещенные Frontend-у: ReactJS, JS, ...</SubTitle>
      <div className="start-container__body">
        {startInfo.map(blog => (
          <div key={blog.img} className="start-container__body-line">
            <div className="img-block">
              <img src={blog.img} alt="" />
            </div>
            <div className="text-block">{blog.text}</div>
          </div>
        ))}
      </div>
    </div>
  )
}