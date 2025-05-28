import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchDoctors, deleteDoctor, setFilters, setSelectedDoctor, resetFilters,setPagination } from "../../action/slice"

export const useDoctorListing = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { doctors: rawDoctors, filters, loading, pagination } = useSelector((state) => state.doctors)

  const filteredDoctors = useMemo(() => {
    return rawDoctors
      .filter(d =>
        (!filters.search || d.name.toLowerCase().includes(filters.search.toLowerCase())) &&
        (!filters.specialty || d.specialty === filters.specialty) &&
        (!filters.department || d.department === filters.department) &&
        (!filters.status || d.status === filters.status) &&
        (!filters.availability || d.availability === filters.availability)
      )
      .sort((a, b) => {
        if (!filters.sortBy) return 0;
        if (filters.sortBy === "name") return a.name.localeCompare(b.name);
        if (filters.sortBy === "experience") return parseInt(b.experience) - parseInt(a.experience);
        if (filters.sortBy === "patients") return b.patients - a.patients;
        return 0;
      });
  }, [rawDoctors, filters]);

  useEffect(() => {
    dispatch(fetchDoctors(filters))
  }, [dispatch, filters])

  const handleFilterChange = (key, value) => {
    dispatch(setFilters({ [key]: value }));
    // Reset to first page on filter change, similar to usePatientListing
    dispatch(setPagination({ page: 1 }));
  }

  const handleResetFilters = () => {
    dispatch(resetFilters());
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
    const csvContent = [
      ["ID", "Name", "Specialty", "Department", "Status", "Availability"],
      ...filteredDoctors.map(d => [d.id, d.name, d.specialty, d.department, d.status, d.availability])
    ].map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "doctors.csv";
    a.click();
    URL.revokeObjectURL(url);
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

  return useMemo(() => ({
    doctors: filteredDoctors,
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
    handleResetFilters,
  }), [filteredDoctors, filters, loading, pagination]);
}