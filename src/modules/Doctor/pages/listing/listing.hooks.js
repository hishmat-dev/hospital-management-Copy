

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchDoctors, deleteDoctor, setFilters, setSelectedDoctor } from "../../action/slice"

export const useDoctorListing = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { doctors, filters, loading, pagination } = useSelector((state) => state.doctors)

  useEffect(() => {
    dispatch(fetchDoctors(filters))
  }, [dispatch, filters])

  const handleFilterChange = (newFilters) => {
    dispatch(setFilters(newFilters))
  }

  const handleView = (doctor) => {
    dispatch(setSelectedDoctor(doctor))
    navigate(`/doctors/detail/${doctor.id}`)
  }

  const handleEdit = (doctor) => {
    dispatch(setSelectedDoctor(doctor))
    navigate(`/doctors/update/${doctor.id}`)
  }

  const handleDelete = async (doctorId) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      await dispatch(deleteDoctor(doctorId))
    }
  }

  const handleExport = () => {
    // Export functionality
    console.log("Exporting doctors...")
  }

  const handleAddNew = () => {
    navigate("/doctors/add")
  }

  const getSpecialtyColor = (specialty) => {
    switch (specialty) {
      case "Cardiology":
        return "bg-red-100 text-red-800"
      case "Orthopedics":
        return "bg-blue-100 text-blue-800"
      case "Emergency Medicine":
        return "bg-orange-100 text-orange-800"
      case "Neurology":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Inactive":
        return "bg-red-100 text-red-800"
      case "On Leave":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return {
    doctors,
    filters,
    loading,
    pagination,
    handleFilterChange,
    handleView,
    handleEdit,
    handleDelete,
    handleExport,
    handleAddNew,
    getSpecialtyColor,
    getStatusColor,
  }
}
