import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card"
import { useDoctorListing } from "./listing.hooks"
import FilterBar from "./components/FilterBar"
import ListItem from "./components/ListItem"

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
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Doctor Management</h1>
      </div>

      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onExport={handleExport}
        onAddNew={handleAddNew}
        onResetFilters={handleResetFilters}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Doctors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{doctors.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Doctors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {doctors.filter((d) => d.status === "Active").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Specialties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(doctors.map((d) => d.specialty)).size}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Duty</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {doctors.filter((d) => d.availability === "Available").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Doctors ({doctors.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
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
              <div className="text-center py-8 text-gray-500">No doctors found. Add a new doctor to get started.</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}