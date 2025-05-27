

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPatientById } from "../../action/slice"

export const useDetailHooks = (patientId) => {
  const dispatch = useDispatch()
  const { patients, loading, error } = useSelector((state) => state.patients)
  const [patient, setPatient] = useState(null)

  useEffect(() => {
    if (patientId) {
      // Try to find patient in existing state first
      const existingPatient = patients.find((p) => p.id === patientId)
      if (existingPatient) {
        setPatient(existingPatient)
      } else {
        // Fetch patient details if not in state
        dispatch(fetchPatientById(patientId))
      }
    }
  }, [patientId, dispatch, patients])

  useEffect(() => {
    if (patients.length > 0 && patientId) {
      const foundPatient = patients.find((p) => p.id === patientId)
      if (foundPatient) {
        setPatient(foundPatient)
      }
    }
  }, [patients, patientId])

  return {
    patient,
    loading,
    error,
  }
}
