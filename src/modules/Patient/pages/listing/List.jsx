import FilterBar from "./components/FilterBar"
import ListItem from "./components/ListItem"
import { usePatientListing } from "./listing.hooks"
import { listingConfig } from "./listing.config"

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

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-[12px]">
            <thead className="bg-primary-color">
              <tr>
                <th className="px-3 text-left  font-medium text-white uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-3 py-3 text-left  font-medium text-white uppercase tracking-wider">Age</th>
                <th className="px-3 py-3 text-left  font-medium text-white uppercase tracking-wider">
                  Gender
                </th>
                <th className="px-3 py-3 text-left  font-medium text-white uppercase tracking-wider">
                  Department
                </th>
                <th className="px-3 py-3 text-left  font-medium text-white uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-3 py-3 text-left  font-medium text-white uppercase tracking-wider">
                  Admission
                </th>
                <th className="px-3 py-3 text-left  font-medium text-white uppercase tracking-wider">
                  Status
                </th>
                <th className="px-3 py-3 text-left  font-medium text-white uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-[12px] ">
              {patients.map((patient) => (
                <ListItem
                  key={patient.id}
                  patient={patient}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  getStatusColor={getStatusColor}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {patients.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No patients found</div>
          <div className="text-white">Try adjusting your search criteria</div>
        </div>
      )}

      {/* Pagination */}
      {pagination.total > pagination.limit && (
        <div className="flex justify-between items-center bg-white px-3 py-3 rounded-lg shadow-md">
          <div className="text-sm text-gray-700">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} results
          </div>
          <div className="flex space-x-2">
            <button disabled={pagination.page === 1} className="px-3 py-1 border rounded disabled:opacity-50">
              Previous
            </button>
            <button
              disabled={pagination.page * pagination.limit >= pagination.total}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
