

import { useState, useCallback } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { createEmergencyCase } from "../../action/slice"
import { validateEmergencyForm, validateField } from "./create.validation"
import { createConfig } from "./create.config"

export const useEmergencyCreate = () => {
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

      const { errors: validationErrors, isValid } = validateEmergencyForm(formData)
      setErrors(validationErrors)

      if (!isValid) return

      setLoading(true)
      try {
        const emergencyData = {
          ...formData,
          id: `E-${Date.now()}`,
          status: "Waiting",
          assignedDoctor: null,
          bedNumber: null,
          createdAt: new Date().toISOString(),
          arrivalTime: formData.arrivalTime || new Date().toISOString(),
        }

        await dispatch(createEmergencyCase(emergencyData)).unwrap()
        navigate("/emergency/list")
      } catch (error) {
        console.error("Error creating emergency case:", error)
      } finally {
        setLoading(false)
      }
    },
    [formData, dispatch, navigate],
  )

  const handleCancel = useCallback(() => {
    navigate("/emergency/list")
  }, [navigate])

  const { isValid } = validateEmergencyForm(formData)

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
