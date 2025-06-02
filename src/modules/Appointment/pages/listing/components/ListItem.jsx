
import { Eye, Edit, Trash2, Calendar, Clock, User, Stethoscope } from "lucide-react"

export default function ListItem({
  appointment,
  onView,
  onEdit,
  onDelete,
  onStatusChange,
  getStatusColor,
  getTypeColor,
}) {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className=" font-medium text-gray-900">{appointment.id}</div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <div className="ml-4">
            <div className=" font-medium text-gray-900">{appointment.patientName}</div>
            <div className=" text-gray-500">{appointment.patientId}</div>
          </div>
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <Stethoscope className="h-4 w-4 text-gray-400 mr-2" />
          <div>
            <div className=" font-medium text-gray-900">{appointment.doctorName}</div>
            <div className=" text-gray-500">{appointment.department}</div>
          </div>
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center  text-gray-900">
          <Calendar className="h-4 w-4 mr-1" />
          {appointment.date}
        </div>
        <div className="flex items-center  text-gray-500 mt-1">
          <Clock className="h-4 w-4 mr-1" />
          {appointment.time}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 py-1 rounded-full  font-medium ${getTypeColor(appointment.type)}`}>
          {appointment.type}
        </span>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <select
          value={appointment.status}
          onChange={(e) => onStatusChange(appointment.id, e.target.value)}
          className={`px-2 py-1 rounded-full  font-medium border-0 ${getStatusColor(appointment.status)}`}
        >
          <option value="Scheduled">Scheduled</option>
          <option value="Confirmed">Confirmed</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
          <option value="No Show">No Show</option>
        </select>
      </td>

      <td className="px-6 py-4 whitespace-nowrap  font-medium">
        <div className="flex space-x-2">
          <button
            onClick={() => onView(appointment)}
            className="text-blue-600 hover:text-blue-900 transition-colors"
            title="View Details"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => onEdit(appointment)}
            className="text-green-600 hover:text-green-900 transition-colors"
            title="Edit Appointment"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(appointment.id)}
            className="text-red-600 hover:text-red-900 transition-colors"
            title="Cancel Appointment"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  )
}
