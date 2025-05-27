

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchPatients, deletePatient, setFilters, setSelectedPatient,setPagination } from "../../action/slice"

export const usePatientListing = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { patients: rawPatients, filters, loading, pagination } = useSelector((state) => state.patients)

  // Apply client-side filtering
  const patients = rawPatients.filter((patient) => {
    const matchesSearch = filters.search
      ? patient.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        patient.id.toLowerCase().includes(filters.search.toLowerCase())
      : true;
    const matchesStatus = filters.status ? patient.status === filters.status : true;
    return matchesSearch && matchesStatus;
  });

  // Apply sorting
  const sortedPatients = [...patients].sort((a, b) => {
    if (filters.sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (filters.sortBy === "admissionDate") {
      return new Date(b.admissionDate) - new Date(a.admissionDate);
    } else if (filters.sortBy === "department") {
      return a.department.localeCompare(b.department);
    }
    return 0;
  });

  useEffect(() => {
    dispatch(fetchPatients(filters))
  }, [dispatch, filters])


  const handleFilterChange = (key, value) => {
    console.log(`Updating filter: ${key} = ${value}`);
    dispatch(setFilters({ [key]: value }));
    dispatch(setPagination({ page: 1 }));
  };
  //added will delete
  const handlePageChange = (newPage) => {
  dispatch(setPagination({ page: newPage }));
  dispatch(fetchPatients({ ...filters, page: newPage }));
};
  const handleView = (patient) => {
    dispatch(setSelectedPatient(patient))
    navigate(`/patients/detail/${patient.id}`)
  }

  const handleEdit = (patient) => {
    dispatch(setSelectedPatient(patient))
    navigate(`/patients/update/${patient.id}`)
  }

  const handleDelete = async (patientId) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      await dispatch(deletePatient(patientId))
    }
  }

  const handleExport = () => {
    // Export functionality
    console.log("Exporting patients...")
  }

  const handleAddNew = () => {
    navigate("/patients/add")
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Admitted":
        return "bg-blue-100 text-blue-800"
      case "Discharged":
        return "bg-green-100 text-green-800"
      case "Under Treatment":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return {
    patients: sortedPatients,
    filters,
    loading,
    pagination,
    handleFilterChange,
    handleView,
    handleEdit,
    handleDelete,
    handleExport,
    handleAddNew,
    getStatusColor,
    handlePageChange,
  }
}
