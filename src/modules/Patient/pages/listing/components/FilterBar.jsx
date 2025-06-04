import { Search, Download, Plus, RotateCcw } from "lucide-react"
import { useCallback } from "react"
import debounce from "lodash.debounce"

export default function FilterBar({ filters, onFilterChange, onExport, onAddNew, statuses, onResetFilters  = [] }) {
  // Debounce search input to avoid excessive re-renders
  
  const handleResetFilters = () => {
    onFilterChange("search", "")
    onFilterChange("status", "")
    onFilterChange("sortBy", "name")
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-3 space-y-4 text-[12px]">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-semibold text-gray-900">Patient Filters</h2>
        <div className="flex space-x-2">
          <button
            onClick={onExport}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
          >
            <Download size={16} />
            <span>Export</span>
          </button>
          <button
            onClick={onAddNew}
            className="bg-primary-color text-white px-4 py-2 rounded-lg  flex items-center space-x-2"
          >
            <Plus size={16} />
            <span>Add Patient</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search patients..."
            defaultValue={filters.search || ""}
            onChange={debounce((e) => onFilterChange("search", e.target.value),1000)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <select
          value={filters.status}
          onChange={(e) => onFilterChange("status", e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Status</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <select
          value={filters.sortBy || "name"}
          onChange={(e) => onFilterChange("sortBy", e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="name">Sort by Name</option>
          <option value="admissionDate">Sort by Date</option>
          <option value="department">Sort by Department</option>
        </select>

        <button
          onClick={onResetFilters}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-300"
        >
          <RotateCcw size={16} />
          <span>Reset</span>
        </button>
      </div>
    </div>
  )
}
