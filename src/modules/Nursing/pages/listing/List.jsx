import FilterBar from "./components/FilterBar"
import VitalsCard from "./components/VitalsCard"
import StatsCards from "./components/StatsCards"
import { useNursingListing } from "./listing.hooks"
import { listingConfig } from "./listing.config"
import LoadingComponent from "../../../../components/ui/LoadingComponent"

export default function NursingList() {
  const {
    vitals,
    filters,
    loading,
    stats,
    handleFilterChange,
    handleView,
    handleEdit,
    handleExport,
    handleAddNew,
    getAlertColor,
  } = useNursingListing()

  // console.log("Nursing status:", stats)
  if (loading) {
    return (
      <LoadingComponent/>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-gray-900 flex items-center space-x-3">
          <div className="bg-green-100 p-2 rounded-lg">
            <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white  font-bold">+</span>
            </div>
          </div>
          <span>Nursing Station</span>
        </h1>
      </div>

      <StatsCards nursingStats={stats} />

      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onExport={handleExport}
        onAddNew={handleAddNew}
        nurses={listingConfig.nurses}
        shifts={listingConfig.shifts}
        alertLevels={listingConfig.alertLevels}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-[12px]">
        {vitals.map((vital) => (
          <VitalsCard
            key={vital.id}
            vital={vital}
            onView={handleView}
            onEdit={handleEdit}
            getAlertColor={getAlertColor}
            // formatTime={formatTime}
          />
        ))}
      </div>

      {vitals.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400  mb-2">No vital signs recorded</div>
          <div className="text-gray-500">Start recording patient vitals</div>
        </div>
      )}
    </div>
  )
}
