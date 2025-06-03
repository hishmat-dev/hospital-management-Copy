
import { Clock, User, AlertTriangle, Activity, Stethoscope, Eye, Edit, UserCheck } from "lucide-react"

export default function EmergencyCard({
  emergencyCase,
  onView,
  onEdit,
  onAssignDoctor,
  onStatusChange,
  getSeverityColor,
  getTriageColor,
  getStatusColor,
  calculateWaitTime,
}) {
  const waitTime = calculateWaitTime(emergencyCase.arrivalTime)

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 border-l-4 hover:shadow-lg transition-shadow ${getSeverityColor(
        emergencyCase.severity,
      ).replace("text-", "border-")}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
            <User size={20} />
            <span>{emergencyCase.patientName}</span>
          </h3>
          <div className="flex items-center space-x-2  text-gray-500 mt-1">
            <span>
              {emergencyCase.age} years • {emergencyCase.gender}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <span className={`px-2 py-1 rounded-full  font-medium ${getSeverityColor(emergencyCase.severity)}`}>
            {emergencyCase.severity}
          </span>
          <span className={`px-2 py-1 rounded-full  font-medium ${getTriageColor(emergencyCase.triageLevel)}`}>
            {emergencyCase.triageLevel}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-start space-x-2">
            <AlertTriangle size={16} className="text-orange-500 mt-0.5" />
            <div>
              <p className=" font-medium text-gray-900">Chief Complaint</p>
              <p className=" text-gray-600">{emergencyCase.complaint}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 ">
          <div className="flex items-center space-x-2">
            <Clock size={14} className="text-blue-500" />
            <div>
              <p className="text-gray-500">Arrival Time</p>
              <p className="font-medium">{new Date(emergencyCase.arrivalTime).toLocaleTimeString()}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Activity size={14} className="text-green-500" />
            <div>
              <p className="text-gray-500">Wait Time</p>
              <p className="font-medium text-red-600">{waitTime}</p>
            </div>
          </div>
        </div>

        {emergencyCase.assignedDoctor && (
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <Stethoscope size={16} className="text-blue-600" />
              <div>
                <p className=" font-medium text-blue-900">Assigned Doctor</p>
                <p className=" text-blue-700">{emergencyCase.assignedDoctor}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t">
          <select
            value={emergencyCase.status}
            onChange={(e) => onStatusChange(emergencyCase.id, e.target.value)}
            className={`px-2 py-1 rounded-full  font-medium border-0 ${getStatusColor(emergencyCase.status)}`}
          >
            <option value="Waiting">Waiting</option>
            <option value="Triage">Triage</option>
            <option value="In Treatment">In Treatment</option>
            <option value="Observation">Observation</option>
            <option value="Discharged">Discharged</option>
            <option value="Admitted">Admitted</option>
            <option value="Transferred">Transferred</option>
          </select>

          <div className="flex space-x-2">
            {!emergencyCase.assignedDoctor && (
              <button
                onClick={() => onAssignDoctor(emergencyCase)}
                className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700  flex items-center space-x-1"
              >
                <UserCheck size={12} />
                <span>Assign</span>
              </button>
            )}
            <button
              onClick={() => onView(emergencyCase)}
              className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 "
            >
              <Eye size={12} />
            </button>
            <button
              onClick={() => onEdit(emergencyCase)}
              className="bg-yellow-600 text-white px-3 py-1 rounded-lg hover:bg-yellow-700 "
            >
              <Edit size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
