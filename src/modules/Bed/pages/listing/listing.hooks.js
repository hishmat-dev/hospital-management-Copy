

import { useEffect, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  fetchBeds,
  deleteBed,
  dischargeBed,
  setSelectedBed,
  setFilters,
  updateOccupancyStats,
} from "../../action/slice"
import { listingHelper } from "./listing.helper"

export const useBedListing = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { beds, loading, filters, pagination, occupancyStats } = useSelector((state) => state.beds)
  const { patients } = useSelector((state) => state.patients)

  useEffect(() => {
    dispatch(fetchBeds({ ...filters, ...pagination }))
  }, [dispatch, filters, pagination])

  useEffect(() => {
    dispatch(updateOccupancyStats())
  }, [dispatch, beds])

  const handleFilterChange = useCallback(
    (key, value) => {
      dispatch(setFilters({ [key]: value }))
    },
    [dispatch],
  )

  const handleView = useCallback(
    (bed) => {
      dispatch(setSelectedBed(bed))
      navigate(`/beds/detail/${bed.id}`)
    },
    [dispatch, navigate],
  )

  const handleEdit = useCallback(
    (bed) => {
      dispatch(setSelectedBed(bed))
      navigate(`/beds/update/${bed.id}`)
    },
    [dispatch, navigate],
  )

  const handleDelete = useCallback(
    async (bedId) => {
      if (window.confirm("Are you sure you want to delete this bed?")) {
        await dispatch(deleteBed(bedId))
      }
    },
    [dispatch],
  )

  const handleAssign = useCallback(
    (bed) => {
      dispatch(setSelectedBed(bed))
      navigate("/beds/assign")
    },
    [dispatch, navigate],
  )

  const handleDischarge = useCallback(
    async (bedId) => {
      if (window.confirm("Are you sure you want to discharge this patient from the bed?")) {
        await dispatch(dischargeBed(bedId))
      }
    },
    [dispatch],
  )

  const handleExport = useCallback(() => {
    listingHelper.exportToCSV(beds)
  }, [beds])

  const handleAddNew = useCallback(() => {
    navigate("/beds/create")
  }, [navigate])

  const handleAssignBed = useCallback(() => {
    navigate("/beds/assign")
  }, [navigate])

  const getStatusColor = useCallback((status) => {
    return listingHelper.getStatusColor(status)
  }, [])

  const getTypeColor = useCallback((type) => {
    return listingHelper.getTypeColor(type)
  }, [])

  return {
    beds,
    filters,
    loading,
    occupancyStats,
    pagination,
    handleFilterChange,
    handleView,
    handleEdit,
    handleDelete,
    handleAssign,
    handleDischarge,
    handleExport,
    handleAddNew,
    handleAssignBed,
    getStatusColor,
    getTypeColor,
  }
}
