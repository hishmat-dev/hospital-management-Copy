import FilterBar from "./components/FilterBar"
import ListItem from "./components/ListItem"
import StatsCards from "./components/StatsCards"
import { useLaboratoryListing } from "./listing.hooks"
import { listingConfig } from "./listing.config"

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
    handleStatusChange,
    handleDownloadReport,
    handleExport,
    handleAddNew,
    getStatusColor,
    // getTypeColor,
    getPriorityColor,
  } = useLaboratoryListing()

  // console.log("test stats", testStats)
  // console.log("lab tests", labTests)

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
        <h1 className="text-2xl font-bold text-gray-900">Laboratory Management</h1>
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

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Test ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Test Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ordered By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {labTests.map((test) => (
                <ListItem
                  key={test.id}
                  test={test}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onStatusChange={handleStatusChange}
                  onDownloadReport={handleDownloadReport}
                  getStatusColor={getStatusColor}
                  // getTypeColor={getTypeColor}
                  getPriorityColor={getPriorityColor}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {labTests.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No lab tests found</div>
          <div className="text-gray-500">Try adjusting your search criteria</div>
        </div>
      )}
    </div>
  )
}
