
import { Bed, User, Calendar, MapPin, Settings, Eye, Edit, Trash2 } from "lucide-react"

export default function BedCard({
  bed,
  onView,
  onEdit,
  onDelete,
  onAssign,
  onDischarge,
  getStatusColor,
  getTypeColor,
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-3 border-l-4 border-primary-color hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className=" font-semibold text-gray-900 flex items-center space-x-2">
            <Bed size={20} />
            <span>
              Room {bed.roomNumber} - Bed {bed.bedNumber}
            </span>
          </h3>
          <div className="flex items-center space-x-2 text-gray-500 mt-1">
            <MapPin size={14} />
            <span>
              {bed.floor} • {bed.department}
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <span className={`px-2 py-1 rounded-full  font-medium ${getStatusColor(bed.status)}`}>
            {bed.status}
          </span>
          <span className={`px-2 py-1 rounded-full  font-medium ${getTypeColor(bed.type)}`}>{bed.type}</span>
        </div>
      </div>

      {bed.status === "Occupied" && bed.patientName ? (
        <div className="space-y-3">
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <User size={16} className="text-blue-600" />
              <span className=" font-medium text-blue-900">{bed.patientName}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar size={14} className="text-blue-500" />
              <span className=" text-blue-700">Admitted: {bed.assignedDate}</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onDischarge(bed.id)}
              className="flex-1 bg-red-color text-white px-3 py-2 rounded-lg hover:bg-red-700  flex items-center justify-center space-x-1"
            >
              <User size={14} />
              <span>Discharge</span>
            </button>
            <button
              onClick={() => onView(bed)}
              className="bg-primary-color text-white px-3 py-2 rounded-lg "
            >
              <Eye size={14} />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="text-center py-4">
            <Bed size={32} className="mx-auto text-gray-300 mb-2" />
            <p className=" text-gray-500">
              {bed.status === "Available" ? "Bed Available" : `Bed ${bed.status}`}
            </p>
            {bed.dailyRate && <p className="text-xs text-gray-400 mt-1">{bed.dailyRate}/day</p>}
          </div>

          <div className="flex space-x-2">
            {bed.status === "Available" && (
              <button
                onClick={() => onAssign(bed)}
                className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700  flex items-center justify-center space-x-1"
              >
                <User size={14} />
                <span>Assign</span>
              </button>
            )}
            <button
              onClick={() => onView(bed)}
              className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 "
            >
              <Eye size={14} />
            </button>
            <button
              onClick={() => onEdit(bed)}
              className="bg-yellow-600 text-white px-3 py-2 rounded-lg hover:bg-yellow-700 "
            >
              <Edit size={14} />
            </button>
            <button
              onClick={() => onDelete(bed.id)}
              className="bg-red-color text-white px-3 py-2 rounded-lg  "
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      )}

      {bed.features && bed.features.length > 0 && (
        <div className="mt-3 pt-3 border-t">
          <div className="flex items-center space-x-1 mb-2">
            <Settings size={14} className="text-gray-400" />
            <span className="text-xs font-medium text-gray-600">Features:</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {bed.features.slice(0, 3).map((feature, index) => (
              <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                {feature}
              </span>
            ))}
            {bed.features.length > 3 && <span className="text-xs text-gray-500">+{bed.features.length - 3} more</span>}
          </div>
        </div>
      )}
    </div>
  )
}
