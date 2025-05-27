

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchDoctorById } from "../../action/slice"

export const useDetailHooks = (doctorId) => {
  const dispatch = useDispatch()
  const { doctors, loading, error } = useSelector((state) => state.doctors)
  const [doctor, setDoctor] = useState(null)

  useEffect(() => {
    if (doctorId) {
      // Try to find doctor in existing state first
      const existingDoctor = doctors.find((d) => d.id === doctorId)
      if (existingDoctor) {
        setDoctor(existingDoctor)
      } else {
        // Fetch doctor details if not in state
        dispatch(fetchDoctorById(doctorId))
      }
    }
  }, [doctorId, dispatch, doctors])

  useEffect(() => {
    if (doctors.length > 0 && doctorId) {
      const foundDoctor = doctors.find((d) => d.id === doctorId)
      if (foundDoctor) {
        setDoctor(foundDoctor)
      }
    }
  }, [doctors, doctorId])

  return {
    doctor,
    loading,
    error,
  }
}
