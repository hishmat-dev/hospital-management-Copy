import { useEffect, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  fetchAppointments,
  deleteAppointment,
  updateAppointment,
  setSelectedAppointment,
  setFilters,
  setPagination,
} from "../../action/slice"
import { listingHelper } from "./listing.helper"

export const useAppointmentListing = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { appointments, loading, filters, pagination } = useSelector((state) => state.appointments)

  useEffect(() => {
    dispatch(fetchAppointments({ ...filters, page: pagination.page, limit: pagination.limit }))
  }, [dispatch, filters, pagination.page, pagination.limit])

  const handleFilterChange = useCallback(
    (key, value) => {
      dispatch(setFilters({ [key]: value }))
      dispatch(setPagination({ page: 1 }))
    },
    [dispatch],
  )

  const handleView = useCallback(
    (appointment) => {
      dispatch(setSelectedAppointment(appointment))
      navigate(`/appointments/detail/${appointment.id}`)
    },
    [dispatch, navigate],
  )

  const handleEdit = useCallback(
    (appointment) => {
      dispatch(setSelectedAppointment(appointment))
      navigate(`/appointments/update/${appointment.id}`)
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
    // Fetch all appointments for export
    dispatch(fetchAppointments({ ...filters, page: 1, limit: pagination.total })).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        listingHelper.exportToCSV(action.payload.data)
      }
    })
  }, [dispatch, filters, pagination.total])

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
    pagination: {
      ...pagination,
      onChange: (page, limit) => {
        dispatch(setPagination({ page, limit: limit !== undefined ? limit : pagination.limit }))
      },
    },
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