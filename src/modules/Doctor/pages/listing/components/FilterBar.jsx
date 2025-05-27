import { Search, Download, Plus, X } from "lucide-react";
import { listingConfig } from "../listing.config";

export default function FilterBar({
  filters,
  onFilterChange,
  onExport,
  onAddNew,
  departments = listingConfig.departments || [], // Fallback to empty array
  statusOptions = listingConfig.statusOptions || [], // Fallback to empty array
}) {

  // console.log("departments:", departments)
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Doctor Filters</h2>
        <div className="flex space-x-2">
          <button
            onClick={onExport}
            className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
          >
            <Download size={16} />
            <span>Export</span>
          </button>
          <button
            onClick={onAddNew}
            className="bg-primary-color text-white px-4 py-2 rounded-lg  flex items-center space-x-2"
          >
            <Plus size={16} />
            <span>Add Doctor</span>
          </button>
          <button
            onClick={() => onFilterChange("reset", null)}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center space-x-2"
          >
            <X size={16} />
            <span>Clear Filters</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search doctors..."
            value={filters.search || ""} // Ensure controlled input
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <select
          value={filters.department || ""} // Ensure controlled input
          onChange={(e) => onFilterChange("department", e.target.value)}
          className="px-3 py-2 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept.value} value={dept.value}>
              {dept.label}
            </option>
          ))}
        </select>

        <select
          value={filters.status || ""} // Ensure controlled input
          onChange={(e) => onFilterChange("status", e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Statuses</option>
          {statusOptions.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>

        <select
          value={filters.sortBy || ""} // Ensure controlled input
          onChange={(e) => onFilterChange("sortBy", e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Sort By</option>
          {(listingConfig.sortOptions || []).map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}