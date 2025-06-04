export const validateAssignForm = (formData) => {
  const errors = {}

  if (!formData.bedId) {
    errors.bedId = "Bed is required"
  }

  if (!formData.patientId?.trim()) {
    errors.patientId = "Patient ID is required"
  }

  if (!formData.patientName?.trim()) {
    errors.patientName = "Patient name is required"
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  }
}

export const validateField = (name, value, formData) => {
  const tempData = { ...formData, [name]: value }
  const { errors } = validateAssignForm(tempData)
  return errors[name] || null
}
