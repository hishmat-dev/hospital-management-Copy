
import { FileText, Clock, CheckCircle, AlertTriangle, XCircle } from "lucide-react"

export default function StatsCards({ testStats={
    total : 0,
    pending : 0,
    inProgress : 0,
    completed : 0,
    cancelled : 0,
  } }) {
   

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Tests</p>
            <p className="text-3xl font-bold text-gray-900">{testStats.total}</p>
          </div>
          <FileText className="h-8 w-8 text-blue-600" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Pending</p>
            <p className="text-3xl font-bold text-yellow-600">{testStats.pending}</p>
          </div>
          <Clock className="h-8 w-8 text-yellow-600" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">In Progress</p>
            <p className="text-3xl font-bold text-blue-600">{testStats.inProgress}</p>
          </div>
          <AlertTriangle className="h-8 w-8 text-blue-600" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Completed</p>
            <p className="text-3xl font-bold text-green-600">{testStats.completed}</p>
          </div>
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Cancelled</p>
            <p className="text-3xl font-bold text-red-600">{testStats.cancelled}</p>
          </div>
          <XCircle className="h-8 w-8 text-red-600" />
        </div>
      </div>
    </div>
  )
}
