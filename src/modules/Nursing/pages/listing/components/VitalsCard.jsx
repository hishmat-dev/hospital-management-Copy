import { Activity, Clock, User, AlertTriangle, Heart, Thermometer, Eye, Edit } from "lucide-react"

export default function VitalsCard({ vital, onView, onEdit, getAlertColor }) {
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 border-l-4 hover:shadow-lg transition-shadow ${getAlertColor(
        vital.alertLevel,
      ).replace("text-", "border-")}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className=" font-semibold text-gray-900 flex items-center space-x-2">
            <User size={20} />
            <span>{vital.patientName}</span>
          </h3>
          <div className="flex items-center space-x-2  text-gray-500 mt-1">
            <span>{vital.patientId}</span>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <span className={`px-2 py-1 rounded-full  font-medium ${getAlertColor(vital.alertLevel)}`}>
            {vital.alertLevel}
          </span>
          
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-red-50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Heart size={16} className="text-red-600" />
            <span className=" font-medium text-red-900">Blood Pressure</span>
          </div>
          <p className=" font-bold text-red-800">{vital.bloodPressure}</p>
          <p className=" text-red-600">HR: {vital.heartRate} bpm</p>
        </div>

        <div className="bg-blue-50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Thermometer size={16} className="text-blue-600" />
            <span className=" font-medium text-blue-900">Temperature</span>
          </div>
          <p className=" font-bold text-blue-800">{vital.temperature}°F</p>
          <p className=" text-blue-600">RR: {vital.respiratoryRate}/min</p>
        </div>

        <div className="bg-green-50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Activity size={16} className="text-green-600" />
            <span className=" font-medium text-green-900">Oxygen Sat</span>
          </div>
          <p className=" font-bold text-green-800">{vital.oxygenSaturation}%</p>
        </div>

        <div className="bg-yellow-50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <AlertTriangle size={16} className="text-yellow-600" />
            <span className=" font-medium text-yellow-900">Pain Scale</span>
          </div>
          <p className=" font-bold text-yellow-800">{vital.painScale || "N/A"}/10</p>
        </div>
      </div>

      {vital.notes && (
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <p className=" text-gray-700">{vital.notes}</p>
        </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t">
        <div className=" text-gray-600">
          <span className="font-medium">Recorded by:</span> {vital.recordedBy}
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => onView(vital)}
            className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700  flex items-center space-x-1"
          >
            <Eye size={12} />
            <span>View</span>
          </button>
          <button
            onClick={() => onEdit(vital)}
            className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700  flex items-center space-x-1"
          >
            <Edit size={12} />
            <span>Edit</span>
          </button>
        </div>
      </div>
    </div>
  )
}
