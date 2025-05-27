export const validatePatientUpdate = (data) => {
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

  if (!data.phone?.trim()) {
    errors.phone = "Phone number is required"
  } else if (!/^\+?[\d\s\-()]+$/.test(data.phone)) {
    errors.phone = "Please enter a valid phone number"
  }

  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address"
  }

  if (!data.bloodGroup) {
    errors.bloodGroup = "Blood group is required"
  }

  return errors
}
