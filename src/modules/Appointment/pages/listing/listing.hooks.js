

import { useEffect, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  fetchAppointments,
  deleteAppointment,
  updateAppointment,
  setSelectedAppointment,
  setFilters,
} from "../../action/slice"
import { listingHelper } from "./listing.helper"

export const useAppointmentListing = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { appointments, loading, filters, pagination } = useSelector((state) => state.appointments)

  useEffect(() => {
    dispatch(fetchAppointments({ ...filters, ...pagination }))
  }, [dispatch, filters, pagination])

  const handleFilterChange = useCallback(
    (key, value) => {
      dispatch(setFilters({ [key]: value }))
    },
    [dispatch],
  )

  const handleView = useCallback(
    (appointment) => {
      dispatch(setSelectedAppointment(appointment))
      navigate("/appointments/details")
    },
    [dispatch, navigate],
  )

  const handleEdit = useCallback(
    (appointment) => {
      dispatch(setSelectedAppointment(appointment))
      navigate("/appointments/update")
    },
    [dispatch, navigate],
  )

  const handleDelete = useCallback(
    async (appointmentId) => {
      if (window.confirm("Are you sure you want to cancel this appointment?")) {
        await dispatch(deleteAppointment(appointmentId))
      }
    },
    [dispatch],
  )

  const handleStatusChange = useCallback(
    async (appointmentId, newStatus) => {
      const appointment = appointments.find((a) => a.id === appointmentId)
      if (appointment) {
        await dispatch(
          updateAppointment({
            id: appointmentId,
            data: { ...appointment, status: newStatus },
          }),
        )
      }
    },
    [dispatch, appointments],
  )

  const handleExport = useCallback(() => {
    listingHelper.exportToCSV(appointments)
  }, [appointments])

  const handleAddNew = useCallback(() => {
    navigate("/appointments/book")
  }, [navigate])

  const getStatusColor = useCallback((status) => {
    return listingHelper.getStatusColor(status)
  }, [])

  const getTypeColor = useCallback((type) => {
    return listingHelper.getTypeColor(type)
  }, [])

  return {
    appointments,
    filters,
    loading,
    pagination,
    handleFilterChange,
    handleView,
    handleEdit,
    handleDelete,
    handleStatusChange,
    handleExport,
    handleAddNew,
    getStatusColor,
    getTypeColor,
  }
}
