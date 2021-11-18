import React from 'react'
import './InputFile.scss'

export const InputFile = ({ article, fileUploadInputChange, uploadName }) => {
  return (
    <div className="custom-file-upload">
      {article?.img &&
        <p className="img-block">
          <img src={article.img} alt="" />
        </p>
      }
      <div className="file-input">
        <input
          type="file"
          id="file"
          className="file"
          onChange={(e) => fileUploadInputChange(e)}
        />
        <label htmlFor="file">Select file</label>
        <p>{uploadName}</p>
      </div>
    </div>
  )
}