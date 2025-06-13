import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card"
import { useDoctorListing } from "./listing.hooks"
import FilterBar from "./components/FilterBar"
import ListItem from "./components/ListItem"
import LoadingComponent from "../../../../components/ui/LoadingComponent"
import DoctorStatsCard from "./components/DoctorStatsCard"
export default function DoctorList() {
  const {
    doctors,
    filters,
    loading,
    handleFilterChange,
    handleView,
    handleEdit,
    handleDelete,
    handleExport,
    handleAddNew,
    getSpecialtyColor,
    getStatusColor,
    handleResetFilters,
  } = useDoctorListing()

  if (loading) {
    return (
      <LoadingComponent/>
    )
  }

  return (
    <div className="text-[12px] p-3 space-y-3">
      <div className="flex justify-between items-center">
        <h1 className=" font-bold text-gray-900">Doctor Management</h1>
      </div>

      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onExport={handleExport}
        onAddNew={handleAddNew}
        onResetFilters={handleResetFilters}
      />

      <div className="text-[12px] grid grid-cols-1 md:grid-cols-4 gap-3">
      <DoctorStatsCard 
        title="Total Doctors" 
        value={doctors.length}
      />
      <DoctorStatsCard 
        title="Active Doctors" 
        value={doctors.filter((d) => d.status === "Active").length}
        textColor="text-green-600"
      />
      <DoctorStatsCard 
        title="Specialties" 
        value={new Set(doctors.map((d) => d.specialty)).size}
      />
      <DoctorStatsCard 
        title="On Duty" 
        value={doctors.filter((d) => d.availability === "Available").length}
        textColor="text-blue-600"
      />
    </div>

      <Card>
      <CardHeader>
        <CardTitle>Doctors ({doctors.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {doctors.map((doctor) => (
            <ListItem
              key={doctor.id}
              doctor={doctor}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
              getSpecialtyColor={getSpecialtyColor}
              getStatusColor={getStatusColor}
            />
          ))}
          {doctors.length === 0 && (
            <div className="col-span-full text-center py-8 text-gray-500">
              No doctors found. Add a new doctor to get started.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
    </div>
  )
}