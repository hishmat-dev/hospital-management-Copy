export const validateVitalsForm = (formData) => {
  const errors = {}

  // Patient validation
  if (!formData.patientId) {
    errors.patientId = "Patient selection is required"
  }

  if (!formData.patientName?.trim()) {
    errors.patientName = "Patient name is required"
  }

  // Vitals validation
  if (formData.bloodPressure && !/^\d{2,3}\/\d{2,3}$/.test(formData.bloodPressure)) {
    errors.bloodPressure = "Blood pressure format should be XXX/XX"
  }

  if (formData.heartRate && (formData.heartRate < 30 || formData.heartRate > 200)) {
    errors.heartRate = "Heart rate should be between 30-200 bpm"
  }

  if (formData.temperature && (formData.temperature < 90 || formData.temperature > 110)) {
    errors.temperature = "Temperature should be between 90-110°F"
  }

  if (formData.respiratoryRate && (formData.respiratoryRate < 8 || formData.respiratoryRate > 40)) {
    errors.respiratoryRate = "Respiratory rate should be between 8-40 breaths/min"
  }

  if (formData.oxygenSaturation && (formData.oxygenSaturation < 70 || formData.oxygenSaturation > 100)) {
    errors.oxygenSaturation = "Oxygen saturation should be between 70-100%"
  }

  if (formData.painLevel && (formData.painLevel < 0 || formData.painLevel > 10)) {
    errors.painLevel = "Pain level should be between 0-10"
  }

  // Date validation
  if (!formData.recordedDate) {
    errors.recordedDate = "Recorded date is required"
  }

  if (!formData.recordedTime) {
    errors.recordedTime = "Recorded time is required"
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  }
}

export const validateField = (name, value, formData) => {
  const tempData = { ...formData, [name]: value }
  const { errors } = validateVitalsForm(tempData)
  return errors[name] || null
}
