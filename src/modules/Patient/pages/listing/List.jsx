import { Table, Button } from "antd";
import FilterBar from "./components/FilterBar";
import { usePatientListing } from "./listing.hooks";
import { listingConfig } from "./listing.config";
import { Eye, Edit, Trash2, User, Calendar, Phone, Mail } from "lucide-react";

export default function PatientList() {
  const {
    patients,
    filters,
    loading,
    pagination,
    handleFilterChange,
    handleView,
    handleEdit,
    handleDelete,
    handleExport,
    handleAddNew,
    getStatusColor,
    handleResetFilters,
    handlePageChange,
  } = usePatientListing();

  const columns = [
    {
      title: "Profile",
      dataIndex: "name",
      key: "profile",
      width: "10%", // ~1.2/12
      
      render: (name) => (
        <div className="flex items-center max-w-[120px] sm:max-w-[150px] px-1 sm:px-2">
          <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-1 flex-shrink-0">
            <User className="h-3 w-3 text-blue-600" />
          </div>
          <div className="text-xs font-medium text-gray-900 truncate">{name}</div>
        </div>
      ),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: "8%", // ~0.96/12
      render: (age) => (
        <div className="text-center text-xs min-w-[30px] px-1 sm:px-2">{age} yrs</div>
      ),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      width: "8%", // ~0.96/12
      render: (gender) => (
        <div className="text-center text-xs min-w-[40px] truncate px-1 sm:px-2">{gender}</div>
      ),
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      width: "14%", // ~1.68/12
      render: (_, patient) => (
        <div className="max-w-[140px] sm:max-w-[180px] px-1 sm:px-2">
          <div className="text-xs truncate">{patient.department}</div>
          <div className="text-xs text-gray-500 truncate">{patient.doctor}</div>
        </div>
      ),
    },
    {
      title: "Contact",
      dataIndex: "phone",
      key: "contact",
      width: "14%", // ~1.68/12
      render: (_, patient) => (
        <div className="max-w-[140px] sm:max-w-[180px] px-1 sm:px-2">
          <div className="flex items-center truncate">
            <Phone className="h-3 w-3 mr-1 flex-shrink-0" />
            <span className="text-xs truncate">{patient.phone}</span>
          </div>
          <div className="flex items-center mt-0.5 text-xs text-gray-500 truncate">
            <Mail className="h-3 w-3 mr-1 flex-shrink-0" />
            <span className="text-xs truncate">{patient.email}</span>
          </div>
        </div>
      ),
    },
    {
      title: "Admission",
      dataIndex: "admissionDate",
      key: "admission",
      width: "12%", // ~1.44/12
      render: (admissionDate) => (
        <div className="flex items-center max-w-[120px] px-1 sm:px-2">
          <Calendar className="h-3 w-3 mr-1 text-gray-500 flex-shrink-0" />
          <span className="text-xs whitespace-nowrap">{admissionDate}</span>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "8%", // ~0.96/12
      render: (status) => (
        <span
          className={`px-1 py-0.5 rounded-sm text-[10px] font-medium truncate ${getStatusColor(status)} min-w-[40px] text-center`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: "8%", // ~0.96/12
   
      render: (_, patient) => (
        <div className="flex space-x-1 justify-end min-w-[50px] px-1 sm:px-2">
          <Button
            type="text"
            icon={<Eye size={12} />}
            onClick={() => handleView(patient)}
            className="text-blue-600 hover:text-blue-900"
            aria-label="View patient"
          />
          <Button
            type="text"
            icon={<Edit size={12} />}
            onClick={() => handleEdit(patient)}
            className="text-green-600 hover:text-green-900"
            aria-label="Edit patient"
          />
          <Button
            type="text"
            icon={<Trash2 size={12} />}
            onClick={() => handleDelete(patient.id)}
            className="text-red-600 hover:text-red-900"
            aria-label="Delete patient"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Patient Management</h1>
      </div>

      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onExport={handleExport}
        onAddNew={handleAddNew}
        statuses={listingConfig.statuses}
        onResetFilters={handleResetFilters}
      />

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <Table
            rowKey="id"
            loading={loading}
            columns={columns}
            dataSource={patients}
            pagination={{
              current: pagination.page,
              pageSize: pagination.limit,
              total: pagination.total,
              showSizeChanger: false,
              onChange: handlePageChange,
              responsive: true,
              className: "lg:hidden",
            }}
            bordered={false}
            scroll={{ x: 1000, y: "calc(100vh - 300px)" }}
            className="w-full text-xs overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          />


        </div>
      </div>

      {patients.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-base sm:text-lg mb-2">No patients found</div>
          <div className="text-gray-600 text-xs">Try adjusting your search criteria</div>
        </div>
      )}
    </div>
  );
}