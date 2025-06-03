
import { Eye, Edit, Trash2, User, Calendar, Phone, Mail } from "lucide-react"

export default function ListItem({ patient, onView, onEdit, onDelete, getStatusColor }) {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-3  whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <div className="ml-4">
            <div className=" font-medium text-gray-900">{patient.name}</div>
            <div className=" text-gray-500">{patient.id}</div>
          </div>
        </div>
      </td>

      <td className="px-3 py-2 whitespace-nowrap  text-gray-900">{patient.age} years</td>

      <td className="px-3 py-2 whitespace-nowrap  text-gray-500">{patient.gender}</td>

      <td className="px-3 py-2 whitespace-nowrap">
        <div className=" text-gray-900">{patient.department}</div>
        <div className=" text-gray-500">{patient.doctor}</div>
      </td>

      <td className="px-3 py-2 whitespace-nowrap">
        <div className="flex items-center  text-gray-500">
          <Phone className="h-4 w-4 mr-1" />
          {patient.phone}
        </div>
        {patient.email && (
          <div className="flex items-center  text-gray-500 mt-1">
            <Mail className="h-4 w-4 mr-1" />
            {patient.email}
          </div>
        )}
      </td>

      <td className="px-3 py-2 whitespace-nowrap">
        <div className="flex items-center  text-gray-500">
          <Calendar className="h-4 w-4 mr-1" />
          {patient.admissionDate}
        </div>
      </td>

      <td className="px-3 py-2 whitespace-nowrap">
        <span className={`px-2 py-1 rounded-sm ${getStatusColor(patient.status)}`}>
          {patient.status}
        </span>
      </td>

      <td className="px-3 py-2 whitespace-nowrap  font-medium">
        <div className="flex space-x-2">
          <button
            onClick={() => onView(patient)}
            className="text-blue-600 hover:text-blue-900 transition-colors"
            title="View Details"
          >
            <Eye size={14} />
          </button>
          <button
            onClick={() => onEdit(patient)}
            className="text-green-600 hover:text-green-900 transition-colors"
            title="Edit Patient"
          >
            <Edit size={14} />
          </button>
          <button
            onClick={() => onDelete(patient.id)}
            className="text-red-600 hover:text-red-900 transition-colors"
            title="Delete Patient"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </td>
    </tr>
  )
}
