
import { Eye, Edit, Trash2, Download, Calendar, Clock, User, Stethoscope, AlertCircle } from "lucide-react"

export default function ListItem({
  test,
  onView,
  onEdit,
  onDelete,
  onStatusChange,
  onDownloadReport,
  getStatusColor,
  // getTypeColor,
  getPriorityColor,
}) {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{test.id}</div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{test.patientName}</div>
            <div className="text-sm text-gray-500">{test.patientId}</div>
          </div>
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{test.testName}</div>
        <div className="flex items-center space-x-1 mt-1">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${(test.testType)}`}>
            {test.testType}
          </span>
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <Stethoscope className="h-4 w-4 text-gray-400 mr-2" />
          <div className="text-sm text-gray-900">{test.orderedBy}</div>
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center text-sm text-gray-900">
          <Calendar className="h-4 w-4 mr-1" />
          {test.orderDate}
        </div>
        {test.reportDate && (
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Clock className="h-4 w-4 mr-1" />
            Report: {test.reportDate}
          </div>
        )}
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-1">
          <AlertCircle className="h-4 w-4 text-gray-400" />
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(test.priority)}`}>
            {test.priority}
          </span>
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <select
          value={test.status}
          onChange={(e) => onStatusChange(test.id, e.target.value)}
          className={`px-2 py-1 rounded-full text-xs font-medium border-0 ${getStatusColor(test.status)}`}
        >
          <option value="Pending">Pending</option>
          <option value="Sample Collected">Sample Collected</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex space-x-2">
          <button
            onClick={() => onView(test)}
            className="text-blue-600 hover:text-blue-900 transition-colors"
            title="View Details"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => onEdit(test)}
            className="text-green-600 hover:text-green-900 transition-colors"
            title="Edit Test"
          >
            <Edit size={16} />
          </button>
          {test.status === "Completed" && (
            <button
              onClick={() => onDownloadReport(test.id)}
              className="text-purple-600 hover:text-purple-900 transition-colors"
              title="Download Report"
            >
              <Download size={16} />
            </button>
          )}
          <button
            onClick={() => onDelete(test.id)}
            className="text-red-600 hover:text-red-900 transition-colors"
            title="Cancel Test"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  )
}
