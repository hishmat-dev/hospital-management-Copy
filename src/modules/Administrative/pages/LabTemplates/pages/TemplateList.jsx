import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Plus, FileText } from "lucide-react";
import LoadingComponent from "../../../../../components/ui/LoadingComponent";
import ReusableTable from "../../../../../components/ui/SharedTable";
import { useEntityActions } from "../../create.hook";
import { fetchLabTemplates, fetchLabCategories, deleteLabTemplate } from "../../../action/slice";

export default function TemplateList() {
  const { labTemplates, labCategories, loading } = useSelector((state) => state.administrative);
  const [categoryFilter, setCategoryFilter] = useState("");
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
  } = useEntityActions("lab-templates", deleteLabTemplate, fetchLabTemplates);

  // Fetch categories on mount
  useEffect(() => {
    updatePaginationTotal(filteredTemplates.length);
  }, [labTemplates, searchTerm, categoryFilter, updatePaginationTotal]);

  const filteredTemplates = filterEntities(labTemplates).filter(
    (template) => !categoryFilter || template.categoryId === categoryFilter
  );

  const getCategoryName = (categoryId) => {
    const category = labCategories.find((cat) => cat.id === categoryId);
    return category ? category.name : labTemplates.find((t) => t.categoryId === categoryId)?.category || "Unknown";
  };

  const headers = [
    { key: "name", label: "Template Name" },
    { key: "category", label: "Category" },
    { key: "parameters", label: "Parameters" },
    { key: "createdAt", label: "Created At" },
    { key: "actions", label: "Actions" },
  ];

  const renderCell = (key, item) => {
    if (key === "category") {
      const category = labCategories.find((cat) => cat.id === item.categoryId);
      return (
        <span
          className="inline-block px-2 py-1 text-xs rounded-full text-white"
          style={{ backgroundColor: category?.color || "#3B82F6" }}
        >
          {getCategoryName(item.categoryId)}
        </span>
      );
    }
    if (key === "parameters") {
      return <span>{item.parameters?.length || 0}</span>;
    }
    if (key === "createdAt") {
      return <span>{new Date(item.createdAt).toLocaleDateString()}</span>;
    }
    return null;
  };

  const paginatedTemplates = filteredTemplates.slice(
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
          <h1 className="text-xl font-bold text-gray-900">Lab Report Templates</h1>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2 bg-primary-color text-white rounded-md transition-colors"
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

        {/* Conditional Rendering: Empty State or Table */}
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
                onClick={handleCreate}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-color text-white rounded-md transition-colors"
              >
                <Plus size={16} />
                Create Template
              </button>
            )}
          </div>
        ) : (
          <ReusableTable
            headers={headers}
            data={paginatedTemplates}
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