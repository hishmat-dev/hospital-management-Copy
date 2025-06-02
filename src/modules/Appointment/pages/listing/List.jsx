import FilterBar from "./components/FilterBar"
import ListItem from "./components/ListItem"
import { useAppointmentListing } from "./listing.hooks"
import { listingConfig } from "./listing.config"

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
        <h1 className=" font-bold text-gray-900">Appointment Management</h1>
      </div>

      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onExport={handleExport}
        onAddNew={handleAddNew}
        departments={listingConfig.departments}
        statuses={listingConfig.statuses}
      />

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left  font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left  font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left  font-medium text-gray-500 uppercase tracking-wider">
                  Doctor
                </th>
                <th className="px-6 py-3 text-left  font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left  font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left  font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left  font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointments.map((appointment) => (
                <ListItem
                  key={appointment.id}
                  appointment={appointment}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onStatusChange={handleStatusChange}
                  getStatusColor={getStatusColor}
                  getTypeColor={getTypeColor}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {appointments.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No appointments found</div>
          <div className="text-gray-500">Try adjusting your search criteria</div>
        </div>
      )}
    </div>
  )
}
