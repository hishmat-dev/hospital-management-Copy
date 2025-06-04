import FilterBar from "./components/FilterBar"
import ReusableTable from "../../../../components/ui/SharedTable"
import { usePatientListing } from "./listing.hooks"
import { listingConfig } from "./listing.config"
import { User, Calendar, Phone, Mail } from "lucide-react"

export default function PatientList() {
  const {
    patients,
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
    handleResetFilters,
  } = usePatientListing()

  const headers = [
    { key: "patient", label: "Patient" },
    { key: "age", label: "Age" },
    { key: "gender", label: "Gender" },
    { key: "department", label: "Department" },
    { key: "contact", label: "Contact" },
    { key: "admission", label: "Admission" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
  ]

  const renderCell = (key, patient) => {
    switch (key) {
      case "patient":
        return (
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="ml-4">
              <div className="font-medium text-gray-900">{patient.name}</div>
              <div className="text-gray-500">{patient.id}</div>
            </div>
          </div>
        )
      case "age":
        return <span className="text-gray-900">{patient.age} years</span>
      case "department":
        return (
          <>
            <div className="text-gray-900">{patient.department}</div>
            <div className="text-gray-500">{patient.doctor}</div>
          </>
        )
      case "contact":
        return (
          <>
            <div className="flex items-center text-gray-500">
              <Phone className="h-4 w-4 mr-1" />
              {patient.phone}
            </div>
            {patient.email && (
              <div className="flex items-center text-gray-500 mt-1">
                <Mail className="h-4 w-4 mr-1" />
                {patient.email}
              </div>
            )}
          </>
        )
      case "admission":
        return (
          <div className="flex items-center text-gray-500">
            <Calendar className="h-4 w-4 mr-1" />
            {patient.admissionDate}
          </div>
        )
      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Patient Management</h1>
      </div>

      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onExport={handleExport}
        onAddNew={handleAddNew}
        statuses={listingConfig.statuses}
        onResetFilters={handleResetFilters}
      />

      <ReusableTable
        headers={headers}
        data={patients}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getStatusColor={getStatusColor}
        renderCell={renderCell}
        keyField="id"
        pagination={{
          page: pagination.page,
          limit: pagination.limit,
          total: pagination.total,
          onPageChange: (page) => pagination.onChange?.(page),
          onLimitChange: (limit) => pagination.onChange?.(pagination.page, limit),
        }}
      />
    </div>
  )
}