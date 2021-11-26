import React, { useState } from 'react'
// import { handleKeyDown } from '../../../static/funcsForForm'
import { TextField, FormControl, InputAdornment, IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material/'

export const ComponentInput = ({ label, type, name, className, value, onChange, error, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }

  const handleClickShowPassword = () => {
    setShowPassword(prevState => !prevState)
  }
  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }
  return (
    <>
      {type === 'password' ? (
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <TextField
            error={!!error}
            label={label}
            id={name}
            type={showPassword ? 'text' : type}
            name={name}
            value={value}
            onChange={handleChange}
            helperText={error}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      ) : (
        <TextField
          label={label}
          error={!!error}
          type={showPassword ? 'text' : type}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          helperText={error}
          {...rest}
        />
      )}
      {/* {error &&
        <div className="error-field-form">{error}</div>
      } */}
    </>
  )
}