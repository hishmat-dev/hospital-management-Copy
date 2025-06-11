
import { Search, Download, Plus, Filter, Calendar } from "lucide-react"

export default function FilterBar({
  filters,
  onFilterChange,
  onExport,
  onAddNew,
  nurses = [],
  shifts = [],
  alertLevels = [],
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4 text-[12px]">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-gray-900 flex items-center space-x-2">
          <Filter size={20} />
          <span>Nursing Filters</span>
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={onExport}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center space-x-2"
          >
            <Download size={16} />
            <span>Export</span>
          </button>
          <button
            onClick={onAddNew}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
          >
            <Plus size={16} />
            <span>Record Vitals</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search patients..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <select
          value={filters.nurse}
          onChange={(e) => onFilterChange("nurse", e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="">All Nurses</option>
          {nurses.map((nurse) => (
            <option key={nurse} value={nurse}>
              {nurse}
            </option>
          ))}
        </select>

        <select
          value={filters.shift}
          onChange={(e) => onFilterChange("shift", e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="">All Shifts</option>
          {shifts.map((shift) => (
            <option key={shift} value={shift}>
              {shift}
            </option>
          ))}
        </select>

        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="date"
            value={filters.dateRange}
            onChange={(e) => onFilterChange("dateRange", e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <select
          value={filters.sortBy}
          onChange={(e) => onFilterChange("sortBy", e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="recordedAt">Sort by Time</option>
          <option value="patient">Sort by Patient</option>
          <option value="alertLevel">Sort by Alert Level</option>
          <option value="nurse">Sort by Nurse</option>
        </select>
      </div>
    </div>
  )
}
