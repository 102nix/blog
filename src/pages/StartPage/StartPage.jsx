import React from "react"
import { SubTitle } from "../../components/common/typografy/SubTitle"

export const StartPage = ({ startInfo }) => {
  return (
    <div className="start-container">
      <SubTitle>Статьи, посвещенные Frontend-у: ReactJS, JS, ...</SubTitle>
      <div className="start-container__body">
        {startInfo.map((start) => (
          <div className="start-container__body-line">
            <div className="img-block">
              <img src={start.img} alt="" />
            </div>
            <div className="text-block">{start.text}</div>
          </div>
        ))}
      </div>
    </div>)
}
