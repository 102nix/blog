import React from 'react'

export const CheckBoxField = ({name, value, onChange, children, error, ...rest}) => {

  const handleChange = () => {
    onChange({name: name, value: !value})
  }

  // const getInputClasses = () => {
  //   return "form-check-input" + (error ? " is-invalid" : "")
  // }

  return (
    <div className="form-check">
      <input 
        className="input-checkbox"
        type="checkbox" 
        value="" 
        onChange={handleChange}
        id={name}
        checked={value}
        {...rest}
      />
      <label className="form-check-label" htmlFor="flexCheckDefault">
        {children}
      </label>
      {error &&
        <div className="invalid-feedback">{error}</div>
      }
    </div>
  )
}

