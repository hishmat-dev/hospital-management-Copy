

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { updatePatient, fetchPatientById } from "../../action/slice"
import { validatePatientUpdate } from "./update.validation"

export const useUpdateHooks = (patientId) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { patients, loading } = useSelector((state) => state.patients)

  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})

  // Load patient data
  useEffect(() => {
    if (patientId) {
      const existingPatient = patients.find((p) => p.id === patientId)
      if (existingPatient) {
        setFormData(existingPatient)
      } else {
        dispatch(fetchPatientById(patientId))
      }
    }
  }, [patientId, dispatch, patients])

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
    const validationErrors = validatePatientUpdate(formData)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      await dispatch(updatePatient({ id: patientId, data: formData })).unwrap()
      navigate(`/patients/detail/${patientId}`)
    } catch (error) {
      console.error("Failed to update patient:", error)
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
