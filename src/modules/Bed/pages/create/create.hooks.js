

import { useState, useCallback } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { createBed } from "../../action/slice"
import { validateBedForm, validateField } from "./create.validation"
import { createConfig } from "./create.config"

export const useBedCreate = () => {
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

      const { errors: validationErrors, isValid } = validateBedForm(formData)
      setErrors(validationErrors)

      if (!isValid) return

      setLoading(true)
      try {
        const bedData = {
          ...formData,
          id: `B-${Date.now()}`,
          patientId: null,
          patientName: null,
          assignedDate: null,
          createdAt: new Date().toISOString(),
        }

        await dispatch(createBed(bedData)).unwrap()
        navigate("/beds/list")
      } catch (error) {
        console.error("Error creating bed:", error)
      } finally {
        setLoading(false)
      }
    },
    [formData, dispatch, navigate],
  )

  const handleCancel = useCallback(() => {
    navigate("/beds/list")
  }, [navigate])

  const { isValid } = validateBedForm(formData)

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
