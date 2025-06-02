
import { Bed, User, Calendar, AlertTriangle } from "lucide-react"

export default function StatsCards({ occupancyStats }) {
  const occupancyRate =
    occupancyStats.total > 0 ? Math.round((occupancyStats.occupied / occupancyStats.total) * 100) : 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className=" font-medium text-gray-600">Total Beds</p>
            <p className=" font-bold text-gray-900">{occupancyStats.total}</p>
          </div>
          <Bed className="h-4 w-4 text-blue-600" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className=" font-medium text-gray-600">Available</p>
            <p className=" font-bold text-green-600">{occupancyStats.available}</p>
          </div>
          <Bed className="h-4 w-4 text-green-600" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className=" font-medium text-gray-600">Occupied</p>
            <p className=" font-bold text-red-600">{occupancyStats.occupied}</p>
          </div>
          <User className="h-4 w-4 text-red-600" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className=" font-medium text-gray-600">Maintenance</p>
            <p className=" font-bold text-yellow-600">{occupancyStats.maintenance}</p>
          </div>
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className=" font-medium text-gray-600">Occupancy Rate</p>
            <p className=" font-bold text-blue-600">{occupancyRate}%</p>
          </div>
          <Calendar className="h-4 w-4 text-blue-600" />
        </div>
      </div>
    </div>
  )
}
