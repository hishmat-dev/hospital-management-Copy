export const validateAppointmentForm = (formData) => {
  const errors = {}

  // Patient validation
  if (!formData.patientId) {
    errors.patientId = "Patient selection is required"
  }

  // Doctor validation
  if (!formData.doctorId) {
    errors.doctorId = "Doctor selection is required"
  }

  // Department validation
  if (!formData.department) {
    errors.department = "Department is required"
  }

  // Type validation
  if (!formData.type) {
    errors.type = "Appointment type is required"
  }

  // Date validation
  if (!formData.date) {
    errors.date = "Appointment date is required"
  } else {
    const selectedDate = new Date(formData.date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (selectedDate < today) {
      errors.date = "Appointment date cannot be in the past"
    }
  }

  // Time validation
  if (!formData.time) {
    errors.time = "Appointment time is required"
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  }
}

export const validateField = (name, value, formData) => {
  const tempData = { ...formData, [name]: value }
  const { errors } = validateAppointmentForm(tempData)
  return errors[name] || null
}
