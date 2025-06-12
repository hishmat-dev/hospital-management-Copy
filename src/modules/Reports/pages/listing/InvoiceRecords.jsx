import React, { useState } from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import ReusableTable from "../../../../components/ui/SharedTable";

const InvoiceRecords = () => {
  const headers = [
    { label: "", key: "checkbox" },
    { label: "Invoice No.", key: "invoiceNo" },
    { label: "Patient", key: "patient" },
    { label: "Created Date", key: "createdDate" },
    { label: "Due Date", key: "dueDate" },
    { label: "Status", key: "status" },
    { label: "Money Spent", key: "moneySpent" },
    { label: "Actions", key: "actions" },
  ];

  const initialData = [
    { invoiceNo: "#00001", patient: "Elisa Shah", createdDate: "20/04/2024", dueDate: "24/04/2024", status: "Paid", moneySpent: "$9830.00" },
    { invoiceNo: "#00002", patient: "Ladonna Jones", createdDate: "12/04/2024", dueDate: "19/04/2024", status: "Pending", moneySpent: "$4567.60" },
    { invoiceNo: "#00003", patient: "Shelly Daniel", createdDate: "11/04/2024", dueDate: "18/04/2024", status: "Paid", moneySpent: "$2980.00" },
    { invoiceNo: "#00004", patient: "Rich Spears", createdDate: "19/04/2024", dueDate: "21/04/2024", status: "Overdue", moneySpent: "$3850.00" },
    { invoiceNo: "#00005", patient: "Carey Russo", createdDate: "20/04/2024", dueDate: "25/04/2024", status: "Paid", moneySpent: "$8900.00" },
    { invoiceNo: "#00006", patient: "Emmett Montes", createdDate: "19/04/2024", dueDate: "22/04/2024", status: "Pending", moneySpent: "$3452.00" },
    { invoiceNo: "#00007", patient: "Cheri Trujillo", createdDate: "28/04/2024", dueDate: "30/04/2024", status: "Paid", moneySpent: "$6530.00" },
    { invoiceNo: "#00008", patient: "Hans Hayes", createdDate: "12/04/2024", dueDate: "27/04/2024", status: "Pending", moneySpent: "$6750.00" },
    { invoiceNo: "#00009", patient: "Dena Ramsey", createdDate: "13/04/2024", dueDate: "26/04/2024", status: "Pending", moneySpent: "$5490.00" },
    { invoiceNo: "#00010", patient: "Reed Case", createdDate: "02/04/2024", dueDate: "24/04/2024", status: "Paid", moneySpent: "$3379.00" },
  ];

  const [data, setData] = useState(initialData);

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-200 text-green-800";
      case "Pending":
        return "bg-yellow-200 text-yellow-800";
      case "Overdue":
        return "bg-red-200 text-red-800";
      default:
        return "";
    }
  };

  const renderCell = (key, item) => {
    if (key === "checkbox") {
      return <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />;
    }
    if (key === "moneySpent") {
      return <span className="font-medium">{item[key]}</span>;
    }
    return null;
  };

  const handleSendMail = (item) => {
    setData((prevData) =>
      prevData.map((record) =>
        record.invoiceNo === item.invoiceNo ? { ...record, sentMail: true } : record
      )
    );
    alert(`Mail sent to ${item.patient} at 06:01 PM PKT on Thursday, June 12, 2025`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <span className="text-sm text-gray-600">Select all checkboxes to send update.</span>
        <button
          onClick={() => alert("Sending update to everyone")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Send to everyone
        </button>
      </div>
      <ReusableTable
        headers={headers}
        data={data}
        onView={() => {}}
        onEdit={() => {}}
        onDelete={() => {}}
        getStatusColor={getStatusColor}
        renderCell={renderCell}
        keyField="invoiceNo"
        pagination={{
          page: 1,
          limit: 10,
          total: 10,
          onPageChange: (page) => console.log("Page changed to:", page),
          onLimitChange: (limit) => console.log("Limit changed to:", limit),
        }}
      >
        {(item) => (
          <button
            onClick={() => handleSendMail(item)}
            className={`px-2 py-1 rounded ${item.sentMail ? "bg-gray-400 text-gray-800 cursor-not-allowed" : "bg-teal-600 text-white hover:bg-teal-700"}`}
            disabled={item.sentMail}
          >
            {item.sentMail ? "Sent Mail" : "Send Mail"}
          </button>
        )}
      </ReusableTable>
    </div>
  );
};

export default InvoiceRecords;