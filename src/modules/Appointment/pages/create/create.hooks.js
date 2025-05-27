

import { useState, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { createAppointment } from "../../action/slice"
import { validateAppointmentForm, validateField } from "./create.validation"
import { createConfig } from "./create.config"

export const useAppointmentCreate = () => {
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

      // Auto-populate patient contact when patient is selected
      if (name === "patientId") {
        const selectedPatient = patients.find((p) => p.id === value)
        setFormData((prev) => ({
          ...prev,
          [name]: value,
          patientContact: selectedPatient?.phone || "",
          department: selectedPatient?.department || prev.department,
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

      const { errors: validationErrors, isValid } = validateAppointmentForm(formData)
      setErrors(validationErrors)

      if (!isValid) return

      setLoading(true)
      try {
        const selectedPatient = patients.find((p) => p.id === formData.patientId)
        const selectedDoctor = doctors.find((d) => d.id === formData.doctorId)

        const appointmentData = {
          ...formData,
          id: `A-${Date.now()}`,
          patientName: selectedPatient?.name || "",
          doctorName: selectedDoctor?.name || "",
          status: "Scheduled",
          createdAt: new Date().toISOString(),
        }

        await dispatch(createAppointment(appointmentData)).unwrap()
        navigate("/appointments/list")
      } catch (error) {
        console.error("Error creating appointment:", error)
      } finally {
        setLoading(false)
      }
    },
    [formData, dispatch, navigate, patients, doctors],
  )

  const handleCancel = useCallback(() => {
    navigate("/appointments/list")
  }, [navigate])

  const { isValid } = validateAppointmentForm(formData)

  return {
    formData,
    errors,
    loading,
    patients,
    doctors,
    timeSlots: createConfig.timeSlots,
    isValid,
    handleChange,
    handleSubmit,
    handleCancel,
  }
}
