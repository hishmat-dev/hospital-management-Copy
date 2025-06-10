

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchLabTemplates, fetchLabCategories, deleteLabTemplate } from "../../../action/slice"
import { Plus, Eye, Edit, Trash2, FileText } from "lucide-react"
import LoadingComponent from "../../../../../components/ui/LoadingComponent"

export default function TemplateList() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { labTemplates, labCategories, loading } = useSelector((state) => state.administrative)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")

  useEffect(() => {
    dispatch(fetchLabTemplates())
    dispatch(fetchLabCategories())
  }, [dispatch])

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this template?")) {
      await dispatch(deleteLabTemplate(id))
    }
  }

  const filteredTemplates = labTemplates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !categoryFilter || template.categoryId === categoryFilter
    return matchesSearch && matchesCategory
  })

  const getCategoryName = (categoryId) => {
    const category = labCategories.find((cat) => cat.id === categoryId)
    return category ? category.name : labTemplates.find((t) => t.categoryId === categoryId)?.category || "Unknown"
  }

  if (loading) {
    return (
      <LoadingComponent/>
    )
  }

  return (
    <div className="space-y-6 text-[12px]">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-gray-900">Lab Report Templates</h1>
          <button
            onClick={() => navigate("/admin/lab-templates/create")}
            className="flex items-center gap-2 px-4 py-2 bg-primary-color text-white rounded-md  transition-colors"
          >
            <Plus size={16} />
            Create Template
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Templates</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search by template name..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              {labCategories
                .filter((cat) => cat.isActive)
                .map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Templates Grid */}
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || categoryFilter
                ? "No templates match your current filters."
                : "Get started by creating your first lab report template."}
            </p>
            {!searchTerm && !categoryFilter && (
              <button
                onClick={() => navigate("/admin/lab-templates/create")}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-color text-white rounded-md  transition-colors"
              >
                <Plus size={16} />
                Create Template
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => {
              const categoryName = getCategoryName(template.categoryId)
              const category = labCategories.find((cat) => cat.id === template.categoryId)

              return (
                <div
                  key={template.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
                      <span
                        className="inline-block px-2 py-1 text-xs rounded-full text-white"
                        style={{ backgroundColor: category?.color || "#3B82F6" }}
                      >
                        {categoryName}
                      </span>
                    </div>
                  </div>

                  {template.description && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{template.description}</p>
                  )}

                  <div className="text-sm text-gray-500 mb-4">
                    <span className="font-medium">{template.parameters?.length || 0}</span> parameters
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => navigate(`/admin/lab-templates/view/${template.id}`)}
                        className="text-blue-600 hover:text-blue-800"
                        title="View Template"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => navigate(`/admin/lab-templates/edit/${template.id}`)}
                        className="text-green-600 hover:text-green-800"
                        title="Edit Template"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(template.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete Template"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="text-xs text-gray-400">{new Date(template.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
