
import { AlertTriangle, Clock, Activity, Users, TrendingUp, UserCheck } from "lucide-react"

export default function StatsCards({ emergencyStats, averageWaitTime }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Cases</p>
            <p className="text-3xl font-bold text-gray-900">{emergencyStats.total}</p>
          </div>
          <Users className="h-8 w-8 text-blue-600" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Critical</p>
            <p className="text-3xl font-bold text-red-600">{emergencyStats.critical}</p>
          </div>
          <AlertTriangle className="h-8 w-8 text-red-600" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Waiting</p>
            <p className="text-3xl font-bold text-yellow-600">{emergencyStats.waiting}</p>
          </div>
          <Clock className="h-8 w-8 text-yellow-600" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">In Treatment</p>
            <p className="text-3xl font-bold text-blue-600">{emergencyStats.inTreatment}</p>
          </div>
          <Activity className="h-8 w-8 text-blue-600" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Discharged</p>
            <p className="text-3xl font-bold text-green-600">{emergencyStats.discharged}</p>
          </div>
          <UserCheck className="h-8 w-8 text-green-600" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Avg Wait Time</p>
            <p className="text-2xl font-bold text-purple-600">{averageWaitTime}</p>
          </div>
          <TrendingUp className="h-8 w-8 text-purple-600" />
        </div>
      </div>
    </div>
  )
}
