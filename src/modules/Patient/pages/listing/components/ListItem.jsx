// import { Table, Button } from "antd";
// import FilterBar from "./components/FilterBar";
// import { usePatientListing } from "./listing.hooks";
// import { listingConfig } from "./listing.config";
// import { Eye, Edit, Trash2, User, Calendar, Phone, Mail } from "lucide-react";

// export default function PatientList() {
//   const {
//     patients,
//     filters,
//     loading,
//     pagination,
//     handleFilterChange,
//     handleView,
//     handleEdit,
//     handleDelete,
//     handleExport,
//     handleAddNew,
//     getStatusColor,
//     handleResetFilters,
//     handlePageChange,
//   } = usePatientListing();

//   const columns = [
//     {
//       title: "Profile",
//       dataIndex: "name",
//       key: "profile",
//       width: "16.67%", // ~2/12
//       fixed: "left",
//       render: (_, patient) => (
//         <div className="flex items-center">
//           <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-2">
//             <User className="h-5 w-5 text-blue-600" />
//           </div>
//           <div>
//             <div className="font-medium text-gray-900 truncate">{patient.name}</div>
//             <div className="text-xs text-gray-500 truncate">{patient.id}</div>
//           </div>
//         </div>
//       ),
//     },
//     {
//       title: "Age",
//       dataIndex: "age",
//       key: "age",
//       width: "8.33%", // ~1/12
//       responsive: ["md"],
//       render: (age) => <div className="text-center">{age} yrs</div>,
//     },
//     {
//       title: "Gender",
//       dataIndex: "gender",
//       key: "gender",
//       width: "8.33%", // ~1/12
//       responsive: ["md"],
//       render: (gender) => <div className="text-center">{gender}</div>,
//     },
//     {
//       title: "Department",
//       dataIndex: "department",
//       key: "department",
//       width: "16.67%", // ~2/12
//       responsive: ["sm"],
//       render: (_, patient) => (
//         <div>
//           <div className="truncate">{patient.department}</div>
//           <div className="text-xs text-gray-500 truncate">{patient.doctor}</div>
//         </div>
//       ),
//     },
//     {
//       title: "Contact",
//       dataIndex: "phone",
//       key: "contact",
//       width: "25%", // ~3/12
//       render: (_, patient) => (
//         <div>
//           <div className="flex items-center truncate">
//             <Phone className="h-4 w-4 mr-1 flex-shrink-0" />
//             {patient.phone}
//           </div>
//           <div className="flex items-center mt-1 text-xs text-gray-500 truncate">
//             <Mail className="h-4 w-4 mr-1 flex-shrink-0" />
//             {patient.email}
//           </div>
//         </div>
//       ),
//     },
//     {
//       title: "Admission",
//       dataIndex: "admissionDate",
//       key: "admission",
//       width: "8.33%", // ~1/12
//       responsive: ["md"],
//       render: (admissionDate) => (
//         <div className="flex items-center truncate">
//           <Calendar className="h-4 w-4 mr-1 text-gray-500 flex-shrink-0" />
//           {admissionDate}
//         </div>
//       ),
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       width: "8.33%", // ~1/12
//       responsive: ["sm"],
//       render: (status) => (
//         <span
//           className={`px-2 py-1 rounded-full text-xs font-medium truncate ${getStatusColor(status)}`}
//         >
//           {status}
//         </span>
//       ),
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       width: "8.33%", // ~1/12
//       fixed: "right",
//       render: (_, patient) => (
//         <div className="flex space-x-2 justify-end">
//           <Button
//             type="text"
//             icon={<Eye size={14} />}
//             onClick={() => handleView(patient)}
//             className="text-blue-600 hover:text-blue-900"
//             aria-label="View patient"
//           />
//           <Button
//             type="text"
//             icon={<Edit size={14} />}
//             onClick={() => handleEdit(patient)}
//             className="text-green-600 hover:text-green-900"
//             aria-label="Edit patient"
//           />
//           <Button
//             type="text"
//             icon={<Trash2 size={14} />}
//             onClick={() => handleDelete(patient.id)}
//             className="text-red-600 hover:text-red-900"
//             aria-label="Delete patient"
//           />
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-gray-900">Patient Management</h1>
//       </div>

//       <FilterBar
//         filters={filters}
//         onFilterChange={handleFilterChange}
//         onExport={handleExport}
//         onAddNew={handleAddNew}
//         statuses={listingConfig.statuses}
//         onResetFilters={handleResetFilters}
//       />

//       <div className="bg-white rounded-lg shadow-md overflow-hidden">
//         <Table
//           rowKey="id"
//           loading={loading}
//           columns={columns}
//           dataSource={patients}
//           pagination={{
//             current: pagination.page,
//             pageSize: pagination.limit,
//             total: pagination.total,
//             showSizeChanger: false,
//             onChange: handlePageChange,
//             responsive: true,
//             className: "lg:hidden", // Hide pagination on large screens
//           }}
//           bordered={false}
//           scroll={{ y: "calc(100vh - 300px)" }}
//           className="w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
//         />
//       </div>

//       {patients.length === 0 && !loading && (
//         <div className="text-center py-12">
//           <div className="text-gray-400 text-lg mb-2">No patients found</div>
//           <div className="text-gray-600">Try adjusting your search criteria</div>
//         </div>
//       )}
//     </div>
//   );
// }