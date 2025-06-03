import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchEmergencyCases,
  deleteEmergencyCase,
  triagePatient,
  assignDoctor,
  setSelectedCase,
  updateStatus,
  setFilters,
  updateEmergencyStats,
} from "../../action/slice";
import { listingHelper } from "./listing.helper";
import { listingConfig } from "./listing.config";

export const useEmergencyListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { emergencyCases, loading, filters, pagination, emergencyStats } = useSelector((state) => state.emergency);

  useEffect(() => {
    dispatch(fetchEmergencyCases({ ...filters, ...pagination }));
  }, [dispatch, filters, pagination]);

  useEffect(() => {
    dispatch(updateEmergencyStats());
  }, [dispatch, emergencyCases]);

  const handleFilterChange = useCallback(
    (key, value) => {
      dispatch(setFilters({ [key]: value }));
    },
    [dispatch],
  );

  const handleView = useCallback(
    (emergencyCase) => {
      dispatch(setSelectedCase(emergencyCase));
      navigate(`/emergency/detail/${emergencyCase.id}`);
    },
    [dispatch, navigate],
  );

  const handleEdit = useCallback(
    (emergencyCase) => {
      dispatch(setSelectedCase(emergencyCase));
      navigate(`/emergency/update/${emergencyCase.id}`);
    },
    [dispatch, navigate],
  );

  const handleDelete = useCallback(
    async (caseId) => {
      if (window.confirm("Are you sure you want to delete this emergency case?")) {
        await dispatch(deleteEmergencyCase(caseId));
      }
    },
    [dispatch],
  );

  const handleTriage = useCallback(
    async (caseId, triageLevel) => {
      await dispatch(triagePatient({ id: caseId, triageLevel }));
    },
    [dispatch],
  );

  const handleAssignDoctor = useCallback(
    async (caseId, doctorId) => {
      await dispatch(assignDoctor({ id: caseId, doctorId }));
    },
    [dispatch],
  );

  const handleStatusChange = useCallback(
    async (caseId, status) => {
      await dispatch(updateStatus({ id: caseId, status }));
    },
    [dispatch],
  );

  const handleExport = useCallback(() => {
    listingHelper.exportToCSV(emergencyCases);
  }, [emergencyCases]);

  const handleAddNew = useCallback(() => {
    navigate("/emergency/add");
  }, [navigate]);

  const getTriageColor = useCallback((level) => {
    return listingHelper.getTriageColor(level);
  }, []);

  const getStatusColor = useCallback((status) => {
    return listingHelper.getStatusColor(status);
  }, []);

  const getSeverityColor = useCallback((severity) => {
    const severityItem = listingConfig.severities.find((s) => s.value === severity);
    return severityItem ? severityItem.color : "text-gray-600";
  }, []);

  const calculateWaitTime = useCallback((arrivalTime) => {
    if (!arrivalTime) return "N/A";
    const arrival = new Date(arrivalTime);
    const now = new Date();
    const diffMs = now - arrival;
    const diffMins = Math.floor(diffMs / 1000 / 60);
    if (diffMins < 60) {
      return `${diffMins} min${diffMins !== 1 ? "s" : ""}`;
    }
    const diffHours = Math.floor(diffMins / 60);
    const remainingMins = diffMins % 60;
    return `${diffHours} hr${diffHours !== 1 ? "s" : ""} ${remainingMins} min${remainingMins !== 1 ? "s" : ""}`;
  }, []);

  return {
    emergencyCases,
    filters,
    loading,
    emergencyStats,
    pagination,
    handleFilterChange,
    handleView,
    handleEdit,
    handleDelete,
    handleTriage,
    handleAssignDoctor,
    handleStatusChange,
    handleExport,
    handleAddNew,
    getTriageColor,
    getStatusColor,
    getSeverityColor,
    calculateWaitTime,
  };
};