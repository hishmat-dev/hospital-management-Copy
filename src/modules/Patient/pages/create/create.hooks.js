

import { useState, useCallback } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { createPatient } from "../../action/slice"
import { validatePatientForm, validateField } from "./create.validation"
import { createConfig } from "./create.config"

export const usePatientCreate = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState(createConfig.initialFormData)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))

      // Real-time validation
      const fieldError = validateField(name, value, formData)
      setErrors((prev) => ({
        ...prev,
        [name]: fieldError,
      }))
    },
    [formData],
  )

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()

      const { errors: validationErrors, isValid } = validatePatientForm(formData)
      setErrors(validationErrors)

      if (!isValid) return

      setLoading(true)
      try {
        const patientData = {
          ...formData,
          id: `P-${Date.now()}`,
          status: "Active",
          registrationDate: new Date().toISOString().split("T")[0],
        }

        // console.log("Creating patient with data:", patientData)
        await dispatch(createPatient(patientData)).unwrap()
        navigate("/patients/list")
      } catch (error) {
        console.error("Error creating patient:", error)
      } finally {
        setLoading(false)
      }
    },
    [formData, dispatch, navigate],
  )

  const handleCancel = useCallback(() => {
    navigate("/patients/list")
  }, [navigate])

  const { isValid } = validatePatientForm(formData)

  return {
    formData,
    errors,
    loading,
    isValid,
    handleChange,
    handleSubmit,
    handleCancel,
  }
}
