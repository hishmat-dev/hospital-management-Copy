import FilterBar from "./components/FilterBar"
import BedCard from "./components/BedCard"
import StatsCards from "./components/StatsCards"
import { useBedListing } from "./listing.hooks"
import { listingConfig } from "./listing.config"

export default function BedList() {
  const {
    beds,
    filters,
    loading,
    occupancyStats,
    pagination,
    handleFilterChange,
    handleView,
    handleEdit,
    handleDelete,
    handleAssign,
    handleDischarge,
    handleExport,
    handleAddNew,
    handleAssignBed,
    getStatusColor,
    getTypeColor,
  } = useBedListing()

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
        <h1 className=" font-bold text-gray-900">Bed Management</h1>
      </div>

      <StatsCards occupancyStats={occupancyStats} />

      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onExport={handleExport}
        onAddNew={handleAddNew}
        onAssignBed={handleAssignBed}
        departments={listingConfig.departments}
        statuses={listingConfig.statuses}
        floors={listingConfig.floors}
        types={listingConfig.types}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {beds.map((bed) => (
          <BedCard
            key={bed.id}
            bed={bed}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAssign={handleAssign}
            onDischarge={handleDischarge}
            getStatusColor={getStatusColor}
            getTypeColor={getTypeColor}
          />
        ))}
      </div>

      {beds.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No beds found</div>
          <div className="text-gray-500">Try adjusting your search criteria</div>
        </div>
      )}
    </div>
  )
}
