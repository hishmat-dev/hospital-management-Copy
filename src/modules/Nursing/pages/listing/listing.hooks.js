

import { useEffect, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchVitals, deleteVitals, setSelectedVital, setFilters, updateNursingStats } from "../../action/slice"
import { listingHelper } from "./listing.helper"
import { listingConfig } from "./listing.config"

export const useNursingListing = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { vitals, loading, filters, pagination, stats } = useSelector((state) => state.nursing)

  useEffect(() => {
    dispatch(fetchVitals({ ...filters, ...pagination }))
  }, [dispatch, filters, pagination])

  useEffect(() => {
    dispatch(updateNursingStats())
  }, [dispatch, vitals])

  const handleFilterChange = useCallback(
    (key, value) => {
      dispatch(setFilters({ [key]: value }))
    },
    [dispatch],
  )

  const handleView = useCallback(
    (vital) => {
      dispatch(setSelectedVital(vital))
      // console.log("Selected Vital:", vital)
      navigate(`/nursing/detail/${vital.patientName}`)
    },
    [dispatch, navigate],
  )

  const handleEdit = useCallback(
    (vital) => {
      dispatch(setSelectedVital(vital))
      navigate(`/nursing/update/${vital.patientName}`)
    },
    [dispatch, navigate],
  )

  const handleDelete = useCallback(
    async (vitalId) => {
      if (window.confirm("Are you sure you want to delete this vitals record?")) {
        await dispatch(deleteVitals(vitalId))
      }
    },
    [dispatch],
  )

  const handleExport = useCallback(() => {
    listingHelper.exportToCSV(vitals)
  }, [vitals])

  const handleAddNew = useCallback(() => {
    navigate("/nursing/record")
  }, [navigate])

  const getStatusColor = useCallback((status) => {
    return listingHelper.getStatusColor(status)
  }, [])

  const getShiftColor = useCallback((shift) => {
    return listingHelper.getShiftColor(shift)
  }, [])

  const getAlertColor = useCallback((alertLevel) => {
    const alertItem = listingConfig.alertLevels.find((a) => a.value === alertLevel);
    return alertItem ? alertItem.color : "text-gray-600"; // Fallback color
  }, []);

  return {
    vitals,
    filters,
    loading,
    stats,
    pagination,
    handleFilterChange,
    handleView,
    handleEdit,
    handleDelete,
    handleExport,
    handleAddNew,
    getStatusColor,
    getShiftColor,
    getAlertColor,
  }
}
