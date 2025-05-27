

import { useState, useCallback } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { createDoctor } from "../../action/slice"
import { validateDoctorForm, validateField } from "./create.validation"
import { createConfig } from "./create.config"

export const useDoctorCreate = () => {
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

      const { errors: validationErrors, isValid } = validateDoctorForm(formData)
      setErrors(validationErrors)

      if (!isValid) return

      setLoading(true)
      try {
        const doctorData = {
          ...formData,
          id: `D-${Date.now()}`,
          status: "Available",
          patients: 0,
          joinDate: new Date().toISOString().split("T")[0],
        }

        await dispatch(createDoctor(doctorData)).unwrap()
        navigate("/doctors/list")
      } catch (error) {
        console.error("Error creating doctor:", error)
      } finally {
        setLoading(false)
      }
    },
    [formData, dispatch, navigate],
  )

  const handleCancel = useCallback(() => {
    navigate("/doctors/list")
  }, [navigate])

  const { isValid } = validateDoctorForm(formData)

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
