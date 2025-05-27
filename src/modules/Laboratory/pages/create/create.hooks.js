

import { useState, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { createLabTest } from "../../action/slice"
import { validateLabTestForm, validateField } from "./create.validation"
import { createConfig } from "./create.config"

export const useLaboratoryCreate = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { patients } = useSelector((state) => state.patients)
  const { doctors } = useSelector((state) => state.doctors)

  const [formData, setFormData] = useState(createConfig.initialFormData)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target

      // Auto-populate patient details when patient is selected
      if (name === "patientId") {
        const selectedPatient = patients.find((p) => p.id === value)
        setFormData((prev) => ({
          ...prev,
          [name]: value,
          patientName: selectedPatient?.name || "",
          patientAge: selectedPatient?.age || "",
          patientGender: selectedPatient?.gender || "",
        }))
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }))
      }

      // Real-time validation
      const fieldError = validateField(name, value, formData)
      setErrors((prev) => ({
        ...prev,
        [name]: fieldError,
      }))
    },
    [formData, patients],
  )

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()

      const { errors: validationErrors, isValid } = validateLabTestForm(formData)
      setErrors(validationErrors)

      if (!isValid) return

      setLoading(true)
      try {
        const labTestData = {
          ...formData,
          id: `L-${Date.now()}`,
          status: "Pending",
          results: null,
          reportDate: null,
          technician: null,
          createdAt: new Date().toISOString(),
        }

        await dispatch(createLabTest(labTestData)).unwrap()
        navigate("/laboratory/list")
      } catch (error) {
        console.error("Error creating lab test:", error)
      } finally {
        setLoading(false)
      }
    },
    [formData, dispatch, navigate],
  )

  const handleCancel = useCallback(() => {
    navigate("/laboratory/list")
  }, [navigate])

  const { isValid } = validateLabTestForm(formData)

  return {
    formData,
    errors,
    loading,
    patients,
    doctors,
    isValid,
    handleChange,
    handleSubmit,
    handleCancel,
  }
}
