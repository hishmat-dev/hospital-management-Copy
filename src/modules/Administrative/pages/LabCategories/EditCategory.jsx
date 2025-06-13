

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchLabCategories, updateLabCategory } from "../../action/slice"
import { Save, X, ArrowLeft } from "lucide-react"
import LoadingComponent from "../../../../components/ui/LoadingComponent"

export default function EditCategory() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { labCategories, loading } = useSelector((state) => state.administrative)
  const [formLoading, setFormLoading] = useState(false)

  const category = labCategories.find((c) => c.id === id)

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    isActive: true,
  })

  useEffect(() => {
    if (!labCategories.length) {
      dispatch(fetchLabCategories())
    }
  }, [dispatch, labCategories.length])

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || "",
        code: category.code || "",
        description: category.description || "",
        isActive: category.isActive !== undefined ? category.isActive : true,
      })
    }
  }, [category])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormLoading(true)

    try {
      await dispatch(updateLabCategory({ id, ...formData })).unwrap()
      navigate("/admin/lab-categories")
    } catch (error) {
      console.error("Error updating category:", error)
    } finally {
      setFormLoading(false)
    }
  }

  const handleCancel = () => {
    navigate("/admin/lab-categories")
  }

  if (loading) {
    return (
      <LoadingComponent/>
    )
  }

  if (!category) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Category not found</h3>
        <button
          onClick={() => navigate("/admin/lab-categories")}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Categories
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6 text-[12px]">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/admin/lab-categories")} className="text-gray-600 hover:text-gray-800">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Edit Lab Category</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="e.g., Hematology"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category Code *</label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="e.g., HEM"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Brief description of the category"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="flex items-center">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="h-4 w-4 text-primary-color focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">Active Category</label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              <X size={16} />
              Cancel
            </button>
            <button
              type="submit"
              disabled={formLoading}
              className="flex items-center gap-2 px-4 py-2 bg-primary-color text-white rounded-md  transition-colors disabled:opacity-50"
            >
              <Save size={16} />
              {formLoading ? "Updating..." : "Update Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
