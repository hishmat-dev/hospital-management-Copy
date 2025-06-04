import { AlertTriangle, Clock, Activity, Users, TrendingUp, UserCheck } from "lucide-react"

export default function StatsCards({ emergencyStats, averageWaitTime }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-[12px]">
      <div className="bg-white rounded-lg shadow-md p-4 flex h-20">
        <div className="flex flex-col justify-center w-2/3">
          <Users className="h-5 w-5 text-blue-600 mb-1" />
          <p className=" font-medium text-gray-600">Total Cases</p>
        </div>
        <div className="flex items-center justify-center w-1/3">
          <p className=" font-bold text-gray-900">{emergencyStats.total}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 flex h-20">
        <div className="flex flex-col justify-center w-2/3">
          <AlertTriangle className="h-5 w-5 text-red-600 mb-1" />
          <p className=" font-medium text-gray-600">Critical</p>
        </div>
        <div className="flex items-center justify-center w-1/3">
          <p className=" font-bold text-red-600">{emergencyStats.critical}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 flex h-20">
        <div className="flex flex-col justify-center w-2/3">
          <Clock className="h-5 w-5 text-yellow-600 mb-1" />
          <p className=" font-medium text-gray-600">Waiting</p>
        </div>
        <div className="flex items-center justify-center w-1/3">
          <p className=" font-bold text-yellow-600">{emergencyStats.waiting}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 flex h-20">
        <div className="flex flex-col justify-center w-2/3">
          <Activity className="h-5 w-5 text-blue-600 mb-1" />
          <p className=" font-medium text-gray-600">In Treatment</p>
        </div>
        <div className="flex items-center justify-center w-1/3">
          <p className=" font-bold text-blue-600">{emergencyStats.inTreatment}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 flex h-20">
        <div className="flex flex-col justify-center w-2/3">
          <UserCheck className="h-5 w-5 text-green-600 mb-1" />
          <p className=" font-medium text-gray-600">Discharged</p>
        </div>
        <div className="flex items-center justify-center w-1/3">
          <p className=" font-bold text-green-600">{emergencyStats.discharged}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 flex h-20">
        <div className="flex flex-col justify-center w-2/3">
          <TrendingUp className="h-5 w-5 text-purple-600 mb-1" />
          <p className=" font-medium text-gray-600">Avg Wait Time</p>
        </div>
        <div className="flex items-center justify-center w-1/3">
          <p className=" font-bold text-purple-600">{averageWaitTime}</p>
        </div>
      </div>
    </div>
  )
}