import { useNavigate } from "react-router-dom";
import { usePatientListing } from "../../../../Patient/pages/listing/listing.hooks";
import { useState, useEffect, useMemo } from "react";
import isEqual from "lodash/isEqual"; // For deep comparison
import ReusableTable from "../../../../../components/ui/SharedTable"; // Adjust the import path as needed
import { Tag } from "antd";
import LoadingComponent from "../../../../../components/ui/LoadingComponent";

export default function AppointmentsTable({ doctor, onStatusChange }) {
  const { patients } = usePatientListing();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Memoize appointment data
  const appointmentData = useMemo(() => {
    if (!doctor?.appointments || !patients) return [];
    return doctor.appointments.map((appointment, index) => ({
      key: index + 1,
      patientId: appointment.patientId,
      patientName: appointment.patientName,
      age: patients.find((p) => p.id === appointment.patientId)?.age || "N/A",
      time: appointment.visitTime || "N/A",
      date: appointment.visitDate || "N/A",
      diagnosis: appointment.prescription?.split(".")[0] || "N/A",
      type: "CONSULTING",
      paymentStatus: appointment.paymentStatus || "N/A",
      appointmentStatus: appointment.appointmentStatus || "N/A",
    }));
  }, [doctor, patients]);

  useEffect(() => {
    if (!isEqual(appointments, appointmentData)) {
      setAppointments(appointmentData);
    }
    setLoading(!doctor?.appointments || !patients);
  }, [appointmentData, appointments]);

  const handleStatusChange = (key, value) => {
    const updatedAppointments = appointments.map((appointment) =>
      appointment.key === key ? { ...appointment, appointmentStatus: value } : appointment
    );
    setAppointments(updatedAppointments);
    onStatusChange?.(key, value, doctor?.id);
  };

  // Define headers for ReusableTable
  const headers = [
    { key: "key", label: "#" },
    { key: "patientName", label: "Patient Name" },
    { key: "age", label: "Age" },
    { key: "time", label: "Time" },
    { key: "date", label: "Date" },
    { key: "diagnosis", label: "Diagnosis" },
    { key: "type", label: "Type" },
    { key: "paymentStatus", label: "Payment Status" },
    { key: "appointmentStatus", label: "Appointment Status" },
    { key: "actions", label: "Actions" },
  ];

  // Define getStatusColor for styling status tags
  const getStatusColor = (status) => {
    const statusColors = {
      Confirmed: "bg-green-100 text-green-800",
      Waiting: "bg-blue-100 text-blue-800",
      Cancelled: "bg-red-100 text-red-800",
    };
    return statusColors[status] || "bg-gray-100 text-gray-800";
  };

  // Define renderCell to customize rendering of cells
  const renderCell = (key, item) => {
    if (key === "patientName") {
      return <span className="truncate">{item[key]}</span>;
    }
    if (key === "diagnosis") {
      return <span className="truncate">{item[key]}</span>;
    }
    if (key === "type") {
      return (
        <span
          className={`inline-block px-2 py-1 text-[10px] font-semibold rounded ${
            item[key] === "GENERAL" ? "bg-yellow-100 text-yellow-800" : "bg-blue-100 text-blue-800"
          }`}
        >
          {item[key]}
        </span>
      );
    }
    if (key === "paymentStatus") {
      return (
        <Tag
          color={item[key] === "Paid" ? "green" : item[key] === "Unpaid" ? "red" : "default"}
          className="text-[10px]"
        >
          {item[key]}
        </Tag>
      );
    }
    if (key === "appointmentStatus") {
      return (
        <Tag
          color={
            item[key] === "Confirmed"
              ? "green"
              : item[key] === "Waiting"
              ? "blue"
              : item[key] === "Cancelled"
              ? "red"
              : "default"
          }
          className="text-[10px]"
        >
          {item[key]}
        </Tag>
      );
    }
    return null; // Default rendering will be handled by ReusableTable
  };

  // Handle view action
  const handleView = (item) => {
    navigate(`/patients/detail/${item.patientId}`);
  };

  // Handle delete action
  const handleDelete = (key) => {
    // Add your delete logic here, e.g., API call to delete appointment
    console.log(`Delete appointment with key: ${key}`);
    // Optionally update appointments state or call an API
  };

 
  const pagination = {
    page: 1, 
    limit: 5, 
    total: appointments.length,
    onPageChange: (newPage) => {
      // Add logic to update page if needed
      console.log(`Change to page: ${newPage}`);
    },
    onLimitChange: (newLimit) => {
      // Add logic to update limit if needed
      console.log(`Change limit to: ${newLimit}`);
    },
  };

  return (
    <div className="bg-white rounded-lg shadow p-3 font-montserrat text-[12px]">
      <h3 className="font-semibold text-gray-900 mb-2">Appointments</h3>
      {loading ? (
        <div className="flex justify-center py-4">
          <LoadingComponent/>
        </div>
      ) : appointments.length === 0 ? (
        <div className="text-center py-4 text-gray-500">No appointments available.</div>
      ) : (
        <ReusableTable
          headers={headers}
          data={appointments}
          onView={handleView}
          onDelete={handleDelete}
          getStatusColor={getStatusColor}
          renderCell={renderCell}
          keyField="key"
          pagination={pagination}
        />
      )}
    </div>
  );
}