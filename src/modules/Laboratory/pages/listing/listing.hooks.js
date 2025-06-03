

import { useEffect, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  fetchLabTests,
  deleteLabTest,
  updateTestResults,
  setSelectedTest,
  setFilters,
  updateTestStats,
} from "../../action/slice"
import { listingHelper } from "./listing.helper"

export const useLaboratoryListing = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { labTests, loading, filters, pagination, testStats } = useSelector((state) => state.laboratory)

  // console.log("stats", testStats)

  useEffect(() => {
    dispatch(fetchLabTests({ ...filters, ...pagination }))
  }, [dispatch, filters, pagination])

  useEffect(() => {
    dispatch(updateTestStats())
  }, [dispatch, labTests])

  const handleFilterChange = useCallback(
    (key, value) => {
      dispatch(setFilters({ [key]: value }))
    },
    [dispatch],
  )

  const handleView = useCallback(
    (labTest) => {
      dispatch(setSelectedTest(labTest))
      navigate(`/laboratory/detail/${labTest.id}`)
    },
    [dispatch, navigate],
  )

  const handleEdit = useCallback(
    (labTest) => {
      dispatch(setSelectedTest(labTest))
      navigate(`/laboratory/update/${labTest.id}`)
    },
    [dispatch, navigate],
  )

  const handleDelete = useCallback(
    async (testId) => {
      if (window.confirm("Are you sure you want to delete this lab test?")) {
        await dispatch(deleteLabTest(testId))
      }
    },
    [dispatch],
  )

  const handleUpdateResults = useCallback(
    async (testId, results) => {
      await dispatch(updateTestResults({ id: testId, results }))
    },
    [dispatch],
  )
  
  const handleDownloadReport = useCallback(
  
    (testId) => {
      const test = labTests.find((t) => t.id === testId)
      console.log("Downloading report for test ID:", testId, test)
      if (test) {
        listingHelper.downloadReport(test)
      } else {
        alert("Test not found")
      }
    },
    [labTests],
  )


  const handleExport = useCallback(() => {
    listingHelper.exportToCSV(labTests)
  }, [labTests])

  const handleAddNew = useCallback(() => {
    navigate("/laboratory/order")
  }, [navigate])

  const getStatusColor = useCallback((status) => {
    return listingHelper.getStatusColor(status)
  }, [])

  const getPriorityColor = useCallback((priority) => {
    return listingHelper.getPriorityColor(priority)
  }, [])

  return {
    labTests,
    filters,
    loading,
    testStats,
    pagination,
    handleFilterChange,
    handleView,
    handleEdit,
    handleDelete,
    handleUpdateResults,
    handleDownloadReport,
    handleExport,
    handleAddNew,
    getStatusColor,
    getPriorityColor,
  }
}
