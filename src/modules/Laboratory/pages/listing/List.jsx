import { Table, Button, Select, Space } from 'antd'
import { Eye, Edit, Trash2, Download, Calendar, Clock, User, Stethoscope, AlertCircle } from 'lucide-react'
import FilterBar from './components/FilterBar'
import StatsCards from './components/StatsCards'
import { useLaboratoryListing } from './listing.hooks'
import { listingConfig } from './listing.config'

export default function LaboratoryList() {
  const {
    labTests,
    filters,
    loading,
    testStats,
    pagination,
    handleFilterChange,
    handleView,
    handleEdit,
    handleDelete,
    handleStatusChange,
    handleDownloadReport,
    handleExport,
    handleAddNew,
    getStatusColor,
    // getTypeColor,
    getPriorityColor,
  } = useLaboratoryListing()

  const columns = [
    
    {
      title: 'Patient',
      key: 'patient',
      width: 100,
      render: (_, record) => (
        <div className="flex items-center">
          
          <div className="">
            <div className="text-sm text-gray-900">{record.patientName}</div>
            <div className="text-xs text-gray-500">{record.patientId}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Test Details',
      key: 'testDetails',
      width: 120,
      render: (_, record) => (
        <div>
          <div className="text-sm text-gray-900">{record.testName}</div>
          <div className="flex items-center space-x-1 mt-1">
            <span className={`px-2 py-1 rounded-full text-xs ${record.testType}`}>
              {record.testType}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: 'Ordered By',
      key: 'orderedBy',
      width: 150,
      render: (_, record) => (
        <div className="flex items-center">
          <Stethoscope className="h-4 w-4 text-gray-400 mr-2" />
          <div className="text-sm text-gray-900">{record.orderedBy}</div>
        </div>
      ),
    },
    {
      title: 'Dates',
      key: 'dates',
      width: 120,
      render: (_, record) => (
        <div>
          <div className="flex items-center text-sm text-gray-900">
            <Calendar className="h-4 w-4 mr-1" />
            {record.orderDate}
          </div>
          {record.reportDate && (
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <Clock className="h-4 w-4 mr-1" />
              Report: {record.reportDate}
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Priority',
      key: 'priority',
      width: 100,
      render: (_, record) => (
        <div className="flex items-center space-x-1">
          <AlertCircle className="h-4 w-4 text-gray-400" />
          <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(record.priority)}`}>
            {record.priority}
          </span>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status, record) => (
        <Select
          value={status}
          onChange={(value) => handleStatusChange(record.id, value)}
          className="w-full max-w-[120px]"
          popupClassName="text-xs"
          options={[
            { value: 'Pending', label: 'Pending' },
            { value: 'Sample Collected', label: 'Sample Collected' },
            { value: 'In Progress', label: 'In Progress' },
            { value: 'Completed', label: 'Completed' },
            { value: 'Cancelled', label: 'Cancelled' },
          ]}
          getPopupContainer={(trigger) => trigger.parentNode}
        />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space size="middle" className="flex gap-1 ">
          <Button
            type="text"
            icon={<Eye size={12} />}
            onClick={() => handleView(record)}
            className="text-blue-600 hover:text-blue-900 "
            title="View Details"
          />
          <Button
            type="text"
            icon={<Edit size={12} />}
            onClick={() => handleEdit(record)}
            className="text-green-600 hover:text-green-900"
            title="Edit Test"
          />
          {record.status === 'Completed' && (
            <Button
              type="text"
              icon={<Download size={12} />}
              onClick={() => handleDownloadReport(record.id)}
              className="text-purple-600 hover:text-purple-900"
              title="Download Report"
            />
          )}
          <Button
            type="text"
            icon={<Trash2 size={12} />}
            onClick={() => handleDelete(record.id)}
            className="text-red-600 hover:text-red-900"
            title="Cancel Test"
          />
        </Space>
      ),
    },
  ]

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4 px-4 sm:px-6 lg:px-0">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900">Laboratory Management</h1>
      </div>

      <StatsCards testStats={testStats} />

      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onExport={handleExport}
        onAddNew={handleAddNew}
        testTypes={listingConfig.testTypes}
        statuses={listingConfig.statuses}
        priorities={listingConfig.priorities}
      />

      <div className="bg-white rounded-lg shadow-md">
        <Table
          columns={columns}
          dataSource={labTests}
          rowKey="id"
          pagination={pagination}
          className="text-sm"
          scroll={{  y: 'calc(100vh - 300px)' }}
          responsive
        />
      </div>

      {labTests.length === 0 && (
        <div className="text-center py-10">
          <div className="text-gray-400 text-base mb-2">No lab tests found</div>
          <div className="text-gray-500 text-sm">Try adjusting your search criteria</div>
        </div>
      )}
    </div>
  )
}
