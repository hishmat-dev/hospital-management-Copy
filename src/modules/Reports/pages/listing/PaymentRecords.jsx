import React from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import ReusableTable from "../../../../components/ui/SharedTable";

const PaymentRecords = () => {
  const headers = [
    { label: "Invoice No.", key: "invoiceNo" },
    { label: "Patient Name", key: "patientName" },
    { label: "Department", key: "department" },
    { label: "Category", key: "category" },
    { label: "Payment Type", key: "paymentType" },
    { label: "Paid Date", key: "paidDate" },
    { label: "Paid Amount", key: "paidAmount" },
    { label: "Status", key: "status" },
    { label: "Actions", key: "actions" },
  ];

  const data = [
    { invoiceNo: "#00098", patientName: "Trugex Malin", department: "Cardiology", category: "Appointment", paymentType: "PayPal", paidDate: "02/05/2024", paidAmount: "$250.00", status: "Paid" },
    { invoiceNo: "#00027", patientName: "Serge Baldwin", department: "Dentistry", category: "Lab Payment", paymentType: "Credit Card", paidDate: "14/05/2024", paidAmount: "$340.00", status: "Paid" },
    { invoiceNo: "#00073", patientName: "Zenaida Frank", department: "General Medicine", category: "Bed Charges", paymentType: "Debit Card", paidDate: "22/05/2024", paidAmount: "$730.00", status: "Unpaid" },
    { invoiceNo: "#00076", patientName: "Henrij Agas", department: "Cardiology", category: "Appointment", paymentType: "Credit Card", paidDate: "22/05/2024", paidAmount: "$763.00", status: "Paid" },
    { invoiceNo: "#00039", patientName: "Kelly James", department: "Dentistry", category: "Lab Payment", paymentType: "Debit Card", paidDate: "26/05/2024", paidAmount: "$231.00", status: "Paid" },
    { invoiceNo: "#00086", patientName: "Carl Jampa", department: "General Medicine", category: "Bed Charges", paymentType: "PayPal", paidDate: "17/05/2024", paidAmount: "$452.00", status: "Paid" },
    { invoiceNo: "#00062", patientName: "Hameed Khan", department: "Cardiology", category: "Appointment", paymentType: "Credit Card", paidDate: "23/05/2024", paidAmount: "$453.00", status: "Paid" },
    { invoiceNo: "#00045", patientName: "Paul Miller", department: "Dentistry", category: "Lab Payment", paymentType: "Debit Card", paidDate: "28/05/2024", paidAmount: "$675.00", status: "Unpaid" },
    { invoiceNo: "#00076", patientName: "Robert Francis", department: "General Medicine", category: "Bed Charges", paymentType: "Credit Card", paidDate: "29/05/2024", paidAmount: "$324.00", status: "Paid" },
    { invoiceNo: "#00067", patientName: "Edison Lee", department: "Cardiology", category: "Appointment", paymentType: "Credit Card", paidDate: "14/05/2024", paidAmount: "$719.00", status: "Paid" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-200 text-green-800";
      case "Unpaid":
        return "bg-red-200 text-red-800";
      default:
        return "";
    }
  };

  const handleView = (item) => {
    alert(`Viewing details for ${item.patientName}`);
  };

  const handleEdit = (item) => {
    alert(`Editing record for ${item.patientName}`);
  };

  const handleDelete = (id) => {
    alert(`Deleting record with ID ${id}`);
  };

  const renderCell = (key, item) => {
    if (key === "paidAmount") {
      return <span className="font-medium">{item[key]}</span>;
    }
    return null;
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Summary</h2>
      <ReusableTable
        headers={headers}
        data={data}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getStatusColor={getStatusColor}
        renderCell={renderCell}
        keyField="invoiceNo"
        pagination={{
          page: 1,
          limit: 10,
          total: 14,
          onPageChange: (page) => console.log("Page changed to:", page),
          onLimitChange: (limit) => console.log("Limit changed to:", limit),
        }}
      />
    </div>
  );
};

export default PaymentRecords;