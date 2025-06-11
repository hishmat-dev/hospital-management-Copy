import { Eye, Edit, Trash2 } from "lucide-react"
import { Select } from "antd"

const { Option } = Select

export default function ReusableTable({
  headers,
  data,
  onView,
  onEdit,
  onDelete,
  getStatusColor,
  renderCell,
  keyField = "id",
  pagination, 
}) {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-[12px]">
            <thead className="bg-primary-color">
              <tr>
                {headers.map((header, index) => (
                  <th
                    key={index}
                    className="px-3 py-3 text-left font-medium text-white uppercase tracking-wider"
                  >
                    {header.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-[12px]">
              {data.map((item) => (
                <tr 
                  key={item[keyField]} 
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => onView && onView(item)}
                >
                  {headers.map((header, index) => (
                    <td key={index} className="px-3 py-2 whitespace-nowrap">
                      {renderCell && renderCell(header.key, item) ? (
                        renderCell(header.key, item)
                      ) : header.key === "actions" ? (
                        <div className="flex space-x-2">
                          {onView && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent row click from triggering
                                onView(item);
                              }}
                              className="text-blue-600 hover:text-blue-900 transition-colors"
                              title="View Details"
                            >
                              <Eye size={14} />
                            </button>
                          )}
                          {onEdit && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent row click from triggering
                                onEdit(item);
                              }}
                              className="text-green-600 hover:text-green-900 transition-colors"
                              title="Edit Item"
                            >
                              <Edit size={14} />
                            </button>
                          )}
                          {onDelete && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent row click from triggering
                                onDelete(item[keyField]);
                              }}
                              className="text-red-600 hover:text-red-900 transition-colors"
                              title="Delete Item"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                      ) : (
                        <span
                          className={
                            header.key === "status" && getStatusColor
                              ? `px-2 py-1 rounded-sm ${getStatusColor(item[header.key])}`
                              : "text-gray-900"
                          }
                        >
                          {item[header.key]}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {data.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">No data found</div>
            <div className="text-white">Try adjusting your search criteria</div>
          </div>
        )}
      </div>

      {pagination && pagination.total > pagination.limit && (
        <div className="flex justify-between items-center bg-white px-3 py-3 rounded-lg shadow-md">
          <div className="text-sm text-gray-700">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} results
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">Rows per page:</span>
              <Select
                value={pagination.limit}
                onChange={(value) => pagination.onLimitChange?.(value)}
                className="text-sm"
                style={{ width: 80 }}
                bordered={false}
              >
                {[10, 20, 50, 100].map((limit) => (
                  <Option key={limit} value={limit}>
                    {limit}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => pagination.onPageChange?.(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => pagination.onPageChange?.(pagination.page + 1)}
                disabled={pagination.page * pagination.limit >= pagination.total}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}