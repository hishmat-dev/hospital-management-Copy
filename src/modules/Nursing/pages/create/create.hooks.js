import { useState, useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { createVitals } from "../../action/slice"
import { validateVitalsForm, validateField } from "./create.validation"
import { createConfig } from "./create.config"

export const useNursingCreate = ({ initialPatient = {} } = {}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { patients } = useSelector((state) => state.patients)

  const [formData, setFormData] = useState({
    ...createConfig.initialFormData,
    patientId: initialPatient.id || "",
    patientName: initialPatient.name || "",
    patientRoom: initialPatient.roomNumber || "",
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  // Ensure patient details are updated if initialPatient changes
  useEffect(() => {
    if (initialPatient.id) {
      const selectedPatient = patients.find((p) => p.id === initialPatient.id) || {
        id: initialPatient.id,
        name: initialPatient.name,
        roomNumber: initialPatient.roomNumber || "",
      }
      setFormData((prev) => ({
        ...prev,
        patientId: selectedPatient.id,
        patientName: selectedPatient.name,
        patientRoom: selectedPatient.roomNumber,
      }))
    }
  }, [initialPatient.id, initialPatient.name, initialPatient.roomNumber, patients])

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
          patientRoom: selectedPatient?.roomNumber || "",
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

      const { errors: validationErrors, isValid } = validateVitalsForm(formData)
      setErrors(validationErrors)

      if (!isValid) return

      setLoading(true)
      try {
        const vitalsData = {
          ...formData,
          id: `V-${Date.now()}`,
          status: "Recorded",
          createdAt: new Date().toISOString(),
        }

        await dispatch(createVitals(vitalsData)).unwrap()
        navigate("/nursing/vitals")
      } catch (error) {
        console.error("Error creating vitals record:", error)
      } finally {
        setLoading(false)
      }
    },
    [formData, dispatch, navigate],
  )

  const handleCancel = useCallback(() => {
    navigate("/nursing/vitals")
  }, [navigate])

  const { isValid } = validateVitalsForm(formData)

  return {
    formData,
    errors,
    loading,
    patients: initialPatient.id
      ? [...patients, { id: initialPatient.id, name: initialPatient.name, roomNumber: initialPatient.roomNumber || "N/A" }].filter(
          (p, i, arr) => arr.findIndex((p2) => p2.id === p.id) === i,
        )
      : patients,
    isValid,
    handleChange,
    handleSubmit,
    handleCancel,
  }
}