

import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchLabTemplates } from "../../../action/slice"
import { ArrowLeft, Edit, FileText } from "lucide-react"

export default function ViewTemplate() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { labTemplates, loading } = useSelector((state) => state.administrative)

  const template = labTemplates.find((t) => t.id === id)

  useEffect(() => {
    if (!labTemplates.length) {
      dispatch(fetchLabTemplates())
    }
  }, [dispatch, labTemplates.length])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!template) {
    return (
      <div className="text-center py-12">
        <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className=" font-medium text-gray-900 mb-2">Template not found</h3>
        <button
          onClick={() => navigate("/admin/lab-templates")}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Templates
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6 text-[12px]">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/admin/lab-templates")} className="text-gray-600 hover:text-gray-800">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Template Details</h1>
          </div>
          <button
            onClick={() => navigate(`/admin/lab-templates/edit/${template.id}`)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Edit size={16} />
            Edit Template
          </button>
        </div>

        {/* Template Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className=" font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div className="space-y-3">
              <div>
                <label className="block  font-medium text-gray-700">Template Name</label>
                <p className="text-gray-900">{template.name}</p>
              </div>
              <div>
                <label className="block  font-medium text-gray-700">Category</label>
                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800  rounded-full">
                  {template.category}
                </span>
              </div>
              {template.description && (
                <div>
                  <label className="block  font-medium text-gray-700">Description</label>
                  <p className="text-gray-900">{template.description}</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className=" font-semibold text-gray-900 mb-4">Template Statistics</h3>
            <div className="space-y-3">
              <div>
                <label className="block  font-medium text-gray-700">Total Parameters</label>
                <p className="text-gray-900">{template.parameters?.length || 0}</p>
              </div>
              <div>
                <label className="block  font-medium text-gray-700">Created Date</label>
                <p className="text-gray-900">{new Date(template.createdAt).toLocaleDateString()}</p>
              </div>
              {template.updatedAt && (
                <div>
                  <label className="block  font-medium text-gray-700">Last Updated</label>
                  <p className="text-gray-900">{new Date(template.updatedAt).toLocaleDateString()}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Parameters Table */}
        <div>
          <h3 className=" font-semibold text-gray-900 mb-4">Test Parameters</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left  font-medium text-gray-500 uppercase tracking-wider">
                    Parameter Name
                  </th>
                  <th className="px-6 py-3 text-left  font-medium text-gray-500 uppercase tracking-wider">
                    Unit
                  </th>
                  <th className="px-6 py-3 text-left  font-medium text-gray-500 uppercase tracking-wider">
                    Normal Range
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {template.parameters?.map((parameter, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap  font-medium text-gray-900">{parameter.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap  text-gray-500">{parameter.unit}</td>
                    <td className="px-6 py-4 whitespace-nowrap  text-gray-500">{parameter.normalRange}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
