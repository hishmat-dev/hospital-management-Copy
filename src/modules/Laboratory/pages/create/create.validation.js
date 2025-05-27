export const validateLabTestForm = (formData) => {
  const errors = {}

  // Patient validation
  if (!formData.patientId) {
    errors.patientId = "Patient selection is required"
  }

  if (!formData.patientName?.trim()) {
    errors.patientName = "Patient name is required"
  }

  // Test validation
  if (!formData.testCategory) {
    errors.testCategory = "Test category is required"
  }

  if (!formData.testType) {
    errors.testType = "Test type is required"
  }

  if (!formData.priority) {
    errors.priority = "Priority level is required"
  }

  if (!formData.orderingDoctor) {
    errors.orderingDoctor = "Ordering doctor is required"
  }

  // Sample validation
  if (!formData.sampleType) {
    errors.sampleType = "Sample type is required"
  }

  if (!formData.collectionDate) {
    errors.collectionDate = "Collection date is required"
  } else {
    const collectionDate = new Date(formData.collectionDate)
    const today = new Date()
    if (collectionDate > today) {
      errors.collectionDate = "Collection date cannot be in the future"
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  }
}

export const validateField = (name, value, formData) => {
  const tempData = { ...formData, [name]: value }
  const { errors } = validateLabTestForm(tempData)
  return errors[name] || null
}
