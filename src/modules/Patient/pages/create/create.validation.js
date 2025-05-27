export const validatePatientForm = (formData) => {
  const errors = {}

  // Name validation
  if (!formData.name?.trim()) {
    errors.name = "Full name is required"
  } else if (formData.name.length < 2) {
    errors.name = "Name must be at least 2 characters"
  }

  // Date of birth validation
  if (!formData.dateOfBirth) {
    errors.dateOfBirth = "Date of birth is required"
  } else {
    const today = new Date()
    const birthDate = new Date(formData.dateOfBirth)
    if (birthDate > today) {
      errors.dateOfBirth = "Date of birth cannot be in the future"
    }
  }

  // Gender validation
  if (!formData.gender) {
    errors.gender = "Gender is required"
  }

  // Phone validation
  if (!formData.phone?.trim()) {
    errors.phone = "Phone number is required"
  } else if (!/^\+?[\d\s\-()]+$/.test(formData.phone)) {
    errors.phone = "Invalid phone number format"
  }

  // Email validation
  if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Invalid email format"
  }

  // Blood group validation
  if (!formData.bloodGroup) {
    errors.bloodGroup = "Blood group is required"
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  }
}

export const validateField = (name, value, formData) => {
  const tempData = { ...formData, [name]: value }
  const { errors } = validatePatientForm(tempData)
  return errors[name] || null
}
