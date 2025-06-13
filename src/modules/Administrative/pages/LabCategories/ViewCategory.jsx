

import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchLabCategories } from "../../action/slice"
import { ArrowLeft, Edit, Tag } from "lucide-react"
import LoadingComponent from "../../../../components/ui/LoadingComponent"

export default function ViewCategory() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { labCategories, loading } = useSelector((state) => state.administrative)

  const category = labCategories.find((c) => c.id === id)

  useEffect(() => {
    if (!labCategories.length) {
      dispatch(fetchLabCategories())
    }
  }, [dispatch, labCategories.length])

  if (loading) {
    return (
      <LoadingComponent/>
    )
  }

  if (!category) {
    return (
      <div className="text-center py-12">
        <Tag className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Category not found</h3>
        <button
          onClick={() => navigate("/admin/lab-categories")}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-color text-white rounded-md transition-colors"
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
            <h1 className=" font-bold text-gray-900">Category Details</h1>
          </div>
          <button
            onClick={() => navigate(`/admin/lab-categories/edit/${category.id}`)}
            className="flex items-center gap-2 px-4 py-2 bg-primary-color text-white rounded-md transition-colors"
          >
            <Edit size={16} />
            Edit Category
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div className="space-y-4">
              <div className="space-y-2" >
                <label className="block  font-medium text-gray-600">Category Name</label>
                <p className="text-gray-900 ">{category.name}</p>
              </div>
              <div className="space-y-2" >
                <label className="block  font-medium text-gray-600">Category Code</label>
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800  rounded-full font-mono">
                  {category.code}
                </span>
              </div>
              {category.description && (
                <div className="space-y-2">
                  <label className="block  font-medium text-gray-600">Description</label>
                  <p className="text-gray-900">{category.description}</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block  font-medium text-gray-700">Color</label>
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded border border-gray-300"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span className="text-gray-900 font-mono">{category.color}</span>
                </div>
              </div>
              <div>
                <label className="block  font-medium text-gray-700">Status</label>
                <span
                  className={`inline-block px-2 py-1  rounded-full ${
                    category.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {category.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              <div>
                <label className="block  font-medium text-gray-700">Created Date</label>
                <p className="text-gray-900">{new Date(category.createdAt).toLocaleDateString()}</p>
              </div>
              {category.updatedAt && (
                <div>
                  <label className="block  font-medium text-gray-700">Last Updated</label>
                  <p className="text-gray-900">{new Date(category.updatedAt).toLocaleDateString()}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
