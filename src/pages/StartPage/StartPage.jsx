import React from "react"

export const StartPage = ({ startInfo }) => {
  return (
    <div className="start-container">
      <h3>Статьи, посвещенные Frontend-у: ReactJS, JS, ...</h3>
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
