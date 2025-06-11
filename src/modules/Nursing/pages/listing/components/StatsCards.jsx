
import { Activity, AlertTriangle, Clock, Users, TrendingUp, Heart } from "lucide-react"

export default function StatsCards({ nursingStats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
      <div className="bg-white rounded-lg shadow-md p-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Vitals</p>
            <p className="text-3xl font-bold text-gray-900">{nursingStats.totalVitals}</p>
          </div>
          <Activity className="h-8 w-8 text-blue-600" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Critical Alerts</p>
            <p className="text-3xl font-bold text-red-600">{nursingStats.criticalAlerts}</p>
          </div>
          <AlertTriangle className="h-8 w-8 text-red-600" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Pending Meds</p>
            <p className="text-3xl font-bold text-yellow-600">{nursingStats.pendingMedications}</p>
          </div>
          <Clock className="h-8 w-8 text-yellow-600" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Active Shifts</p>
            <p className="text-3xl font-bold text-green-600">{nursingStats.activeShifts}</p>
          </div>
          <Users className="h-8 w-8 text-green-600" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Avg Response</p>
            <p className="text-2xl font-bold text-purple-600">12m</p>
          </div>
          <TrendingUp className="h-8 w-8 text-purple-600" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Patient Load</p>
            <p className="text-2xl font-bold text-indigo-600">8.5</p>
          </div>
          <Heart className="h-8 w-8 text-indigo-600" />
        </div>
      </div>
    </div>
  )
}
