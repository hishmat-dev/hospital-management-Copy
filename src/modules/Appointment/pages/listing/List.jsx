import FilterBar from "./components/FilterBar"
import ReusableTable from "../../../../components/ui/SharedTable"
import { useAppointmentListing } from "./listing.hooks"
import { listingConfig } from "./listing.config"
import { Eye, Edit, Trash2, Calendar, Clock, User, Stethoscope } from "lucide-react"
import { Select } from "antd"

const { Option } = Select

export default function AppointmentList() {
  const {
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
  } = useAppointmentListing()

  const headers = [
    { key: "id", label: "ID" },
    { key: "patient", label: "Patient" },
    { key: "doctor", label: "Doctor" },
    { key: "dateTime", label: "Date & Time" },
    { key: "type", label: "Type" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
  ]

  const renderCell = (key, record) => {
    switch (key) {
      case "id":
        return <div className="text-[12px] text-gray-900">{record.id}</div>
      case "patient":
        return (
          <div className="flex items-center text-[12px]">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            <div className="ml-4">
              <div className=" text-gray-900">{record.patientName}</div>
              <div className="text-gray-500">{record.patientId}</div>
            </div>
          </div>
        )
      case "doctor":
        return (
          <div className="flex items-center text-[12px]">
            <Stethoscope className="h-4 w-4 text-gray-400 mr-2" />
            <div>
              <div className=" text-gray-900">{record.doctorName}</div>
              <div className="text-gray-500">{record.department}</div>
            </div>
          </div>
        )
      case "dateTime":
        return (
          <div className="text-[12px]">
            <div className="flex items-center text-gray-900">
              <Calendar className="h-4 w-4 mr-1" />
              {record.date}
            </div>
            <div className="flex items-center text-gray-500 mt-1">
              <Clock className="h-4 w-4 mr-1" />
              {record.time}
            </div>
          </div>
        )
      case "type":
        return (
          <span className={`px-2 py-1 rounded-full ${getTypeColor(record.type)}`}>
            {record.type}
          </span>
        )
      case "status":
        return (
          <span className={`px-2 py-1 rounded-full ${getTypeColor(record.status)}`}>
            {record.status}
          </span>
        )
      default:
        return null
    }
  }

  // Slice the appointments array to respect pagination
  const paginatedAppointments = appointments.slice(
    (pagination.page - 1) * pagination.limit,
    pagination.page * pagination.limit
  )

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-3 text-[12px]">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-gray-900">Appointment Management</h1>
      </div>
      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onExport={handleExport}
        onAddNew={handleAddNew}
        departments={listingConfig.departments}
        statuses={listingConfig.statuses}
      />
      <ReusableTable
        headers={headers}
        data={paginatedAppointments}
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