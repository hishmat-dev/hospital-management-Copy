import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Plus, Tag } from "lucide-react";
import LoadingComponent from "../../../../components/ui/LoadingComponent";
import ReusableTable from "../../../../components/ui/SharedTable";
import { useEntityActions } from "../create.hook";
import { fetchLabCategories, deleteLabCategory } from "../../action/slice";

export default function CategoryList() {
  const { labCategories, loading } = useSelector((state) => state.administrative);
  const {
    searchTerm,
    setSearchTerm,
    pagination,
    handleView,
    handleEdit,
    handleDelete,
    handleCreate,
    handlePageChange,
    handleLimitChange,
    filterEntities,
    updatePaginationTotal,
  } = useEntityActions("lab-categories", deleteLabCategory, fetchLabCategories);

  useEffect(() => {
    updatePaginationTotal(filteredCategories.length);
  }, [labCategories, searchTerm, updatePaginationTotal]);

  const filteredCategories = filterEntities(labCategories);

  const headers = [
    { key: "name", label: "Category Name" },
    { key: "code", label: "Code" },
    { key: "description", label: "Description" },
    { key: "createdAt", label: "Created At" },
    { key: "actions", label: "Actions" },
  ];

  const renderCell = (key, item) => {
    if (key === "code") {
      return (
        <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
          {item.code}
        </span>
      );
    }
    if (key === "description") {
      return item.description ? (
        <span className="line-clamp-2">{item.description}</span>
      ) : (
        <span className="text-gray-400">No description</span>
      );
    }
    if (key === "createdAt") {
      return <span>{new Date(item.createdAt).toLocaleDateString()}</span>;
    }
    return null;
  };

  const paginatedCategories = filteredCategories.slice(
    (pagination.page - 1) * pagination.limit,
    pagination.page * pagination.limit
  );

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div className="space-y-6 text-[12px]">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-gray-900">Lab Categories</h1>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2 bg-primary-color text-white rounded-md transition-colors"
          >
            <Plus size={16} />
            Create Category
          </button>
        </div>

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

        {filteredCategories.length === 0 ? (
          <div className="text-center py-12">
            <Tag className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm ? "No categories match your search." : "Get started by creating your first lab category."}
            </p>
            {!searchTerm && (
              <button
                onClick={handleCreate}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-color text-white rounded-md transition-colors"
              >
                <Plus size={16} />
                Create Category
              </button>
            )}
          </div>
        ) : (
          <ReusableTable
            headers={headers}
            data={paginatedCategories}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            renderCell={renderCell}
            keyField="id"
            pagination={{
              ...pagination,
              onPageChange: handlePageChange,
              onLimitChange: handleLimitChange,
            }}
          />
        )}
      </div>
    </div>
  );
}