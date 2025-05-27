export const validateDoctorForm = (formData) => {
  const errors = {}

  // Name validation
  if (!formData.name?.trim()) {
    errors.name = "Full name is required"
  } else if (formData.name.length < 2) {
    errors.name = "Name must be at least 2 characters"
  }

  // Employee ID validation
  if (!formData.employeeId?.trim()) {
    errors.employeeId = "Employee ID is required"
  }

  // Gender validation
  if (!formData.gender) {
    errors.gender = "Gender is required"
  }

  // Specialty validation
  if (!formData.specialty) {
    errors.specialty = "Specialty is required"
  }

  // Department validation
  if (!formData.department) {
    errors.department = "Department is required"
  }

  // License number validation
  if (!formData.licenseNumber?.trim()) {
    errors.licenseNumber = "Medical license number is required"
  }

  // Experience validation
  if (!formData.experience) {
    errors.experience = "Years of experience is required"
  } else if (formData.experience < 0 || formData.experience > 50) {
    errors.experience = "Experience must be between 0 and 50 years"
  }

  // Qualification validation
  if (!formData.qualification?.trim()) {
    errors.qualification = "Qualification is required"
  }

  // Shift validation
  if (!formData.shift) {
    errors.shift = "Shift is required"
  }

  // Phone validation
  if (!formData.phone?.trim()) {
    errors.phone = "Phone number is required"
  } else if (!/^\+?[\d\s\-()]+$/.test(formData.phone)) {
    errors.phone = "Invalid phone number format"
  }

  // Email validation
  if (!formData.email?.trim()) {
    errors.email = "Email address is required"
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Invalid email format"
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  }
}

export const validateField = (name, value, formData) => {
  const tempData = { ...formData, [name]: value }
  const { errors } = validateDoctorForm(tempData)
  return errors[name] || null
}
