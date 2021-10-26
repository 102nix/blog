export const handleChange = (setData, target) => {
  console.log(target)
  setData(prevSate => ({
    ...prevSate,
    [target.name]: target.value
  }))
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
    form.elements[indexField+1].focus()
  }
}