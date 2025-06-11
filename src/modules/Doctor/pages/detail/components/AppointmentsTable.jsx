import { Table, Tag, Spin } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { usePatientListing } from "../../../../Patient/pages/listing/listing.hooks";
import { useState, useEffect, useMemo } from "react";
import isEqual from "lodash/isEqual"; // For deep comparison

export default function AppointmentsTable({ doctor, onStatusChange }) {
  const { patients } = usePatientListing();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

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
  }, [doctor, patients]); // Depend on doctor and patients directly

  useEffect(() => {
    // Only update state if appointmentData has changed
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

  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
      width: 10,
      align: "center",
    },
    {
      title: "Patient Name",
      dataIndex: "patientName",
      key: "patientName",
      width: 120,
      render: (text) => (
        <div className="flex items-center space-x-2">
          <span className="truncate">{text}</span>
        </div>
      ),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: 60,
      align: "center",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      width: 80,
      align: "center",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 100,
      align: "center",
    },
    {
      title: "Diagnosis",
      dataIndex: "diagnosis",
      key: "diagnosis",
      width: 80,
      align: "center",
      render: (text) => <span className="truncate">{text}</span>,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 80,
      align: "center",
      render: (text) => (
        <span
          className={`inline-block px-2 py-1 text-[10px] font-semibold rounded ${text === "GENERAL" ? "bg-yellow-100 text-yellow-800" : "bg-blue-100 text-blue-800"
            }`}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      width: 120,
      align: "center",
      render: (status) => (
        <Tag
          color={status === "Paid" ? "green" : status === "Unpaid" ? "red" : "default"}
          className="text-[10px]"
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Appointment Status",
      dataIndex: "appointmentStatus",
      key: "appointmentStatus",
      width: 80,
      align: "center",
      render: (status) => {
        const statusColors = {
          Confirmed: "green",
          Waiting: "blue",
          Cancelled: "red",
        };
        return (
          <Tag color={statusColors[status] || "default"} className="text-[10px]">
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      align: "center",
      render: (_, record) => (
        <div className="flex justify-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent row click from triggering
              navigate(`/patients/detail/${record.patientId}`);
            }}
            className="text-blue-600 hover:text-blue-800"
          >
            <EyeOutlined />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent row click from triggering
              // console.log(`Delete appointment ${record.key}`);
            }}
            className="text-red-600 hover:text-red-800"
          >
            <DeleteOutlined />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-3 font-montserrat text-[12px]">
      <h3 className="font-semibold text-gray-900 mb-2">Appointments</h3>
      {loading ? (
        <div className="flex justify-center py-4">
          <Spin />
        </div>
      ) : appointments.length === 0 ? (
        <div className="text-center py-4 text-gray-500">No appointments available.</div>
      ) : (
        <Table
          columns={columns}
          dataSource={appointments}
          pagination={{
            pageSize: 5,
            showSizeChanger: false,
            position: ["bottomRight"],
          }}
          className="dr_appoinments_ant-table-small"
          rowClassName="text-[12px] cursor-pointer"
          scroll={{ x: "max-content" }}
          onRow={(record) => ({
            onClick: () => navigate(`/patients/detail/${record.patientId}`),
          })}
        />
      )}
    </div>
  );
}