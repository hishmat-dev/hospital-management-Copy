import FilterBar from "./components/FilterBar"
import StatsCards from "./components/StatsCards"
import ReusableTable from "../../../../components/ui/SharedTable"
import { useLaboratoryListing } from "./listing.hooks"
import { listingConfig } from "./listing.config"
import { Eye, Edit, Trash2, Calendar, Clock, User, Stethoscope } from "lucide-react"

import LoadingComponent from "../../../../components/ui/LoadingComponent"

export default function LaboratoryList() {
  const {
    labTests,
    filters,
    loading,
    testStats,
    pagination,
    handleFilterChange,
    handleView,
    handleEdit,
    handleDelete,
    handleExport,
    handleAddNew,
    getStatusColor,
    getPriorityColor,
  } = useLaboratoryListing()

  const headers = [
    { key: "patient", label: "Patient" },
    { key: "testDetails", label: "Test Details" },
    { key: "orderedBy", label: "Ordered By" },
    { key: "dates", label: "Dates" },
    { key: "priority", label: "Priority" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
  ]

  const renderCell = (key, record) => {
    switch (key) {
      case "patient":
        return (
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            <div className="ml-4">
              <div className=" text-gray-900">{record.patientName}</div>
              <div className=" text-gray-500">{record.patientId}</div>
            </div>
          </div>
        )
      case "testDetails":
        return (
          <div>
            <div className=" text-gray-900">{record.testName}</div>
            <div className="flex items-center space-x-1 mt-1">
              <span className={`${record.testType}`}>
                {record.testType}
              </span>
            </div>
          </div>
        )
      case "orderedBy":
        return (
          <div className="flex items-center">
            <Stethoscope className="h-4 w-4 text-gray-400 mr-2" />
            <div className=" text-gray-900">{record.doctorName}</div>
          </div>
        )
      case "dates":
        return (
          <div>
            <div className="flex items-center  text-gray-900">
              <Calendar className="h-4 w-4 mr-1" />
              {record.orderedDate}
            </div>
            {record.reportDate && (
              <div className="flex items-center  text-gray-500 mt-1">
                <Clock className="h-4 w-4 mr-1" />
                Report: {record.expectedDate}
              </div>
            )}
          </div>
        )
      case "priority":
        return (
          <div className="flex items-center space-x-1">
            <span className={`px-2 py-1 rounded-full  ${getPriorityColor(record.priority)}`}>
              {record.priority}
            </span>
          </div>
        )
      case "status":
        return (
          <div className="flex items-center space-x-1">
            <span className={`px-2 py-1 rounded-full  ${getPriorityColor(record.status)}`}>
              {record.status}
            </span>
          </div>
        )
      case "actions":
        return (
          <div className="flex gap-1">
            <button
              onClick={() => handleView(record)}
              className="text-blue-600 hover:text-blue-900"
              title="View Details"
            >
              <Eye size={12} />
            </button>
            <button
              onClick={() => handleEdit(record)}
              className="text-green-600 hover:text-green-900"
              title="Edit Test"
            >
              <Edit size={12} />
            </button>
           
            <button
              onClick={() => handleDelete(record.id)}
              className="text-red-600 hover:text-red-900"
              title="Cancel Test"
            >
              <Trash2 size={12} />
            </button>
          </div>
        )
      default:
        return null
    }
  }

  if (loading) {
    return (
      <LoadingComponent/>
    )
  }

  return (
    <div className="space-y-4 px-4 sm:px-6 lg:px-0">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900">Laboratory Management</h1>
      </div>

      <StatsCards testStats={testStats} />

      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onExport={handleExport}
        onAddNew={handleAddNew}
        testTypes={listingConfig.testTypes}
        statuses={listingConfig.statuses}
        priorities={listingConfig.priorities}
      />

      <ReusableTable
        headers={headers}
        data={labTests}
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