export const validateBedForm = (formData) => {
  const errors = {}

  // Room number validation
  if (!formData.roomNumber?.trim()) {
    errors.roomNumber = "Room number is required"
  }

  // Bed number validation
  if (!formData.bedNumber?.trim()) {
    errors.bedNumber = "Bed number is required"
  }

  // Floor validation
  if (!formData.floor) {
    errors.floor = "Floor is required"
  }

  // Department validation
  if (!formData.department) {
    errors.department = "Department is required"
  }

  // Type validation
  if (!formData.type) {
    errors.type = "Bed type is required"
  }

  // Daily rate validation
  if (formData.dailyRate && (isNaN(formData.dailyRate) || formData.dailyRate < 0)) {
    errors.dailyRate = "Daily rate must be a valid positive number"
  }

  // Max occupancy validation
  if (
    formData.maxOccupancy &&
    (isNaN(formData.maxOccupancy) || formData.maxOccupancy < 1 || formData.maxOccupancy > 4)
  ) {
    errors.maxOccupancy = "Maximum occupancy must be between 1 and 4"
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  }
}

export const validateField = (name, value, formData) => {
  const tempData = { ...formData, [name]: value }
  const { errors } = validateBedForm(tempData)
  return errors[name] || null
}
