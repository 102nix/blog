export const handleChange = (setData, target, setEnterErrors) => {
  console.log(target)
  setData(prevSate => ({
    ...prevSate,
    [target.name]: typeof target.value === 'boolean' ? target.value : target.value.trim()
  }))
  setEnterErrors(null)
}

export const handleSubmit = (e, validate, data) => {
  e.preventDefault()
  const isValid = validate()
  if (!isValid) return
  console.log(data)
}

export const handleKeyDown = (e) => {
  if (e.keyCode === 13) {
    e.preventDefault()
    const form = e.target.form
    const indexField = Array.prototype.indexOf.call(form, e.target)
    form.elements[indexField + 1].focus()
  }
}