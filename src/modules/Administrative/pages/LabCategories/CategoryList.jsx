

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchLabCategories, deleteLabCategory } from "../../action/slice"
import { Plus, Eye, Edit, Trash2, Tag } from "lucide-react"
import LoadingComponent from "../../../../components/ui/LoadingComponent"

export default function CategoryList() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { labCategories, loading } = useSelector((state) => state.administrative)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    dispatch(fetchLabCategories())
  }, [dispatch])

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      await dispatch(deleteLabCategory(id))
    }
  }

  const filteredCategories = labCategories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return (
     <LoadingComponent/>
    )
  }

  return (
    <div className="space-y-6 text-[12px]">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-gray-900">Lab Categories</h1>
          <button
            onClick={() => navigate("/admin/lab-categories/create")}
            className="flex items-center gap-2 px-4 py-2 bg-primary-color text-white rounded-md transition-colors"
          >
            <Plus size={16} />
            Create Category
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Search Categories</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search by category name..."
          />
        </div>

        {/* Categories Grid */}
        {filteredCategories.length === 0 ? (
          <div className="text-center py-12">
            <Tag className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm ? "No categories match your search." : "Get started by creating your first lab category."}
            </p>
            {!searchTerm && (
              <button
                onClick={() => navigate("/admin/lab-categories/create")}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-color text-white rounded-md transition-colors"
              >
                <Plus size={16} />
                Create Category
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {category.code}
                    </span>
                  </div>
                </div>

                {category.description && (
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{category.description}</p>
                )}

                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => navigate(`/admin/lab-categories/view/${category.id}`)}
                      className="text-blue-600 hover:text-blue-800"
                      title="View Category"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => navigate(`/admin/lab-categories/edit/${category.id}`)}
                      className="text-green-600 hover:text-green-800"
                      title="Edit Category"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete Category"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="text-xs text-gray-400">{new Date(category.createdAt).toLocaleDateString()}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
