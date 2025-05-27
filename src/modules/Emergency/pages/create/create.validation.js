export const validateEmergencyForm = (formData) => {
  const errors = {}

  // Patient validation
  if (!formData.patientName?.trim()) {
    errors.patientName = "Patient name is required"
  }

  if (!formData.patientAge) {
    errors.patientAge = "Patient age is required"
  } else if (formData.patientAge < 0 || formData.patientAge > 150) {
    errors.patientAge = "Please enter a valid age"
  }

  if (!formData.patientGender) {
    errors.patientGender = "Patient gender is required"
  }

  if (!formData.patientPhone?.trim()) {
    errors.patientPhone = "Patient phone is required"
  }

  // Medical validation
  if (!formData.chiefComplaint?.trim()) {
    errors.chiefComplaint = "Chief complaint is required"
  }

  if (!formData.triageLevel) {
    errors.triageLevel = "Triage level is required"
  }

  if (!formData.arrivalMode) {
    errors.arrivalMode = "Arrival mode is required"
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

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  }
}

export const validateField = (name, value, formData) => {
  const tempData = { ...formData, [name]: value }
  const { errors } = validateEmergencyForm(tempData)
  return errors[name] || null
}
