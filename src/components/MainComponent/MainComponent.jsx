import React from 'react'

export const MainComponent = ({ mainInfo }) => {
  return (
    <>
      {mainInfo.length > 0 &&
        mainInfo.map(main => (
          <div className="main-container__body-line">
            <div className="img-block">
              <img src={main.img} alt="" />
            </div>
            <div className="text-block">{main.text}</div>
          </div>    
        ))
      }
    </>
  )
}