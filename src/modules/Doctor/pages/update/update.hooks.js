

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { updateDoctor, fetchDoctorById } from "../../action/slice"
import { validateDoctorUpdate } from "./update.validation"

export const useUpdateHooks = (doctorId) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { doctors, loading, error } = useSelector((state) => state.doctors)

  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})

  // Load doctor data
  useEffect(() => {
    if (doctorId) {
      const existingDoctor = doctors.find((d) => d.id === doctorId)
      if (existingDoctor) {
        setFormData(existingDoctor)
      } else {
        dispatch(fetchDoctorById(doctorId))
      }
    }
  }, [doctorId, dispatch, doctors])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleSubmit = async () => {
    const validationErrors = validateDoctorUpdate(formData)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      await dispatch(updateDoctor({ id: doctorId, data: formData })).unwrap()
      navigate(`/doctors/detail/${doctorId}`)
    } catch (error) {
      console.error("Failed to update doctor:", error)
    }
  }

  return {
    formData,
    errors,
    loading,
    handleInputChange,
    handleSubmit,
  }
}
