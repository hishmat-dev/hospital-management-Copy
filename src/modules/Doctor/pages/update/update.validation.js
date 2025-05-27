export const validateDoctorUpdate = (data) => {
  const errors = {}

  // Required fields
  if (!data.name?.trim()) {
    errors.name = "Full name is required"
  }

  if (!data.dateOfBirth) {
    errors.dateOfBirth = "Date of birth is required"
  }

  if (!data.gender) {
    errors.gender = "Gender is required"
  }

  if (!data.specialty) {
    errors.specialty = "Specialty is required"
  }

  if (!data.department) {
    errors.department = "Department is required"
  }

  if (!data.licenseNumber?.trim()) {
    errors.licenseNumber = "License number is required"
  }

  if (!data.experience) {
    errors.experience = "Years of experience is required"
  } else if (data.experience < 0 || data.experience > 50) {
    errors.experience = "Experience must be between 0 and 50 years"
  }

  if (!data.qualification?.trim()) {
    errors.qualification = "Qualifications are required"
  }

  if (!data.phone?.trim()) {
    errors.phone = "Phone number is required"
  } else if (!/^\+?[\d\s\-()]+$/.test(data.phone)) {
    errors.phone = "Please enter a valid phone number"
  }

  if (!data.email?.trim()) {
    errors.email = "Email address is required"
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address"
  }

  return errors
}
