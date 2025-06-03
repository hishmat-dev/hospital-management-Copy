import { Table, Button, Select, Space } from 'antd'
import FilterBar from "./components/FilterBar"
import { useAppointmentListing } from "./listing.hooks"
import { listingConfig } from "./listing.config"
import { Eye, Edit, Trash2, Calendar, Clock, User, Stethoscope } from "lucide-react"

const { Option } = Select

export default function AppointmentList() {
  const {
    appointments,
    filters,
    loading,
    pagination,
    handleFilterChange,
    handleView,
    handleEdit,
    handleDelete,
    handleStatusChange,
    handleExport,
    handleAddNew,
    getStatusColor,
    getTypeColor,
  } = useAppointmentListing()

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', render: (id) => <div className="text-[12px] text-gray-900">{id}</div> },
    {
      title: 'Patient',
      key: 'patientName',
      render: (_, record) => (
        <div className="flex items-center text-[12px]">
          {/* <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="h-5 w-5 text-blue-600" />
          </div> */}
          <div className="">
            <div className="font-medium text-gray-900">{record.patientName}</div>
            <div className="text-gray-500">{record.patientId}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Doctor',
      key: 'doctorName',
      render: (_, record) => (
        <div className="flex items-center text-[12px]">
          <Stethoscope className="h-4 w-4 text-gray-400 mr-2" />
          <div>
            <div className="font-medium text-gray-900">{record.doctorName}</div>
            <div className="text-gray-500">{record.department}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Date & Time',
      key: 'dateTime',
      render: (_, record) => (
        <div className='text-[12px]'>
          <div className="flex items-center text-gray-900">
            <Calendar className="h-4 w-4 mr-1" />
            {record.date}
          </div>
          <div className="flex items-center text-gray-500 mt-1">
            <Clock className="h-4 w-4 mr-1" />
            {record.time}
          </div>
        </div>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => <span className={`px-2 py-1 rounded-full  ${getTypeColor(type)}`}>{type}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <Select
          value={status}
          onChange={(value) => handleStatusChange(record.id, value)}
          className={`text-[12px] ${getStatusColor(status)}`}
          bordered={false}
          style={{ width: 120 }}
        >
          {['Scheduled', 'Confirmed', 'In Progress', 'Completed', 'Cancelled', 'No Show'].map((status) => (
            <Option key={status} value={status}>{status}</Option>
          ))}
        </Select>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space >
          <Button type="link" onClick={() => handleView(record)} title="View Details" icon={<Eye size={12} className="text-blue-600 hover:text-blue-900" />} />
          <Button type="link" onClick={() => handleEdit(record)} title="Edit Appointment" icon={<Edit size={12} className="text-green-600 hover:text-green-900" />} />
          <Button type="link" onClick={() => handleDelete(record.id)} title="Cancel Appointment" icon={<Trash2 size={12} className="text-red-600 hover:text-red-900" />} />
        </Space>
      ),
    },
  ]

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-3 text-[12px]">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-gray-900">Appointment Management</h1>
      </div>
      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onExport={handleExport}
        onAddNew={handleAddNew}
        departments={listingConfig.departments}
        statuses={listingConfig.statuses}
      />
      <div className="bg-white rounded-lg shadow-md overflow-hidden ">
        <Table columns={columns} dataSource={appointments} rowKey="id" pagination={pagination} className="overflow-x-auto text-[12px]" />
      </div>
      {/* {appointments.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No appointments found</div>
          <div className="text-gray-500">Try adjusting your search criteria</div>
        </div>
      )} */}
    </div>
  )
}