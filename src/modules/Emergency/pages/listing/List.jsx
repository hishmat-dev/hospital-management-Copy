import FilterBar from "./components/FilterBar"
import EmergencyCard from "./components/EmergencyCard"
import StatsCards from "./components/StatsCards"
import { useEmergencyListing } from "./listing.hooks"
import { listingConfig } from "./listing.config"
import LoadingComponent from './../../../../components/ui/LoadingComponent';

export default function EmergencyList() {
  const {
    emergencyCases,
    filters,
    loading,
    emergencyStats,
    averageWaitTime,
    handleFilterChange,
    handleView,
    handleEdit,
    handleAssignDoctor,
    handleStatusChange,
    handleExport,
    handleAddNew,
    getSeverityColor,
    getTriageColor,
    getStatusColor,
    calculateWaitTime,
  } = useEmergencyListing()

  if (loading) {
    return (
      <LoadingComponent/>
    )
  }


  return (
    <div className="space-y-3 text-[12px] " >
      <div className="flex justify-between items-center">
        <h1 className=" font-bold text-gray-900 flex items-center space-x-3">
          <div className="bg-red-100 p-2 rounded-lg">
            <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">!</span>
            </div>
          </div>
          <span>Emergency Department</span>
        </h1>
      </div>

      <StatsCards emergencyStats={emergencyStats} averageWaitTime={averageWaitTime} />

      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onExport={handleExport}
        onAddNew={handleAddNew}
        severities={listingConfig.severities}
        triageLevels={listingConfig.triageLevels}
        statuses={listingConfig.statuses}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {emergencyCases.map((emergencyCase) => (
          <EmergencyCard
            key={emergencyCase.id}
            emergencyCase={emergencyCase}
            onView={handleView}
            onEdit={handleEdit}
            onAssignDoctor={handleAssignDoctor}
            onStatusChange={handleStatusChange}
            getSeverityColor={getSeverityColor}
            getTriageColor={getTriageColor}
            getStatusColor={getStatusColor}
            calculateWaitTime={calculateWaitTime}
          />
        ))}
      </div>

      {emergencyCases.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No emergency cases found</div>
          <div className="text-gray-500">All clear in the emergency department</div>
        </div>
      )}
    </div>
  )
}
