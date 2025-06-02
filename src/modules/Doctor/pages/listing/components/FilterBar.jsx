import { memo, useCallback } from "react";
import { Search, Download, Plus, X } from "lucide-react";
import { listingConfig } from "../listing.config";
import { debounce } from "lodash";

function FilterBar({
  filters,
  onFilterChange,
  onExport,
  onAddNew,
  onResetFilters,
  departments = listingConfig.departments || [],
  statuses = listingConfig.statuses || [],
  availabilities = listingConfig.availabilities || [],
  sortOptions = listingConfig.sortOptions || []
}) {
  const debouncedFilterChange = useCallback(
    debounce((key, value) => {
      onFilterChange(key, value);
    }, 300),
    [onFilterChange]
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-3 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className=" font-semibold text-gray-900">Doctor Filters</h2>
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
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus size={16} />
            <span>Add Doctor</span>
          </button>
          <button
            onClick={onResetFilters}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center space-x-2"
          >
            <X size={16} />
            <span>Clear Filters</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search doctors..."
            value={filters.search || ""}
            onChange={(e) => debouncedFilterChange("search", e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* <select
          value={filters.specialty || ""}
          onChange={(e) => onFilterChange("specialty", e.target.value)}
          className="px-3 py-2 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Specialties</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select> */}

        <select
          value={filters.department || ""}
          onChange={(e) => onFilterChange("department", e.target.value)}
          className="px-3 py-2 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <select
          value={filters.status || ""}
          onChange={(e) => onFilterChange("status", e.target.value)}
          className="px-3 py-2 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Statuses</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        {/* <select
          value={filters.availability || ""}
          onChange={(e) => onFilterChange("availability", e.target.value)}
          className="px-3 py-2 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Availabilities</option>
          {availabilities.map((avail) => (
            <option key={avail} value={avail}>
              {avail}
            </option>
          ))}
        </select> */}

        <select
          value={filters.sortBy || ""}
          onChange={(e) => onFilterChange("sortBy", e.target.value)}
          className="px-3 py-2 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Sort By</option>
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default memo(FilterBar, (prevProps, nextProps) => {
  return (
    prevProps.filters === nextProps.filters &&
    prevProps.onFilterChange === nextProps.onFilterChange &&
    prevProps.onExport === nextProps.onExport &&
    prevProps.onAddNew === nextProps.onAddNew &&
    prevProps.onResetFilters === nextProps.onResetFilters
  );
});