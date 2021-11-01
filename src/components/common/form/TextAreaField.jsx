import React from 'react'
import PropTypes from 'prop-types'

export const TextAreaField = ({ label, name, className, value, onChange, error, ...rest }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }

  // const getInputClasses = () => {
  //   return "form-control" + (error ? " is-invalid" : "")
  // }
  return (
    <div className="mb-4">
      <label htmlFor={name}> {label}</label>
      <div className="input-group">
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          className={className}
          {...rest}
          rows="10"
        />
      </div>
      {error &&
        <div className="error-field-form">{error}</div>
      }
    </div>
  )
}

TextAreaField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string
}