import React from 'react'
import { useField } from 'formik'

export const InputComponent = ({label, ...props}) => {

  const [field, meta] = useField(props)

  return (
    <>
      <div className="form-group">
        <label 
          htmlFor={props.id || props.name}
          className='label-reg-form'
        >
          {label}
        </label>
        <input
          className="input-reg-form"
          {...field}
          {...props}
        />
      </div >
      {
        meta.touched && meta.error ? <div className="error-field-form">{meta.error}</div> : null
      }
    </>
  )
}