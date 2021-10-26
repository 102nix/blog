import React, { useState } from 'react'

export const TextField = ({ label, type, name, value, onChange, error, ...rest }) => {
  
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = ({ target }) => {
    onChange({name: target.name, value: target.value})
  }

  // const getInputClasses = () => {
  //   return "form-control" + (error ? " is-invalid" : "")
  // }
  
  const togleShowPassword = () => {
    setShowPassword(prevState => !prevState)
  }

  return (
    <div className="form-group">
      <label htmlFor={name} className='label-auth-form'> {label}</label>
      <div className="input-group">
        <input 
          type={ showPassword ? 'text' : type} 
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          className='input-auth-form'
          {...rest}
        />
        {type === "password" &&
          <button 
            className="btn btn-span" 
            type="button" 
            onClick={togleShowPassword}
          >
            {showPassword ? (
              <span className="material-icons">visibility</span>
            ) : (
              <span className="material-icons">visibility_off</span>
            )}
            
          </button>
        }
      </div>
        {error &&
          <div className="error-field-form">{error}</div>
        }
  
    </div>
  )
}
