import { Table } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { usePatientListing } from "../../../../Patient/pages/listing/listing.hooks";

export default function AppointmentsTable({ doctor }) {
  const { patients } = usePatientListing();
  const navigate = useNavigate();

  const appointments = (doctor?.appointments || []).map((appointment, index) => {
    const matchedPatient = patients.find((p) => p.id === appointment.patientId);

    return {
      key: index + 1,
      patientId: appointment.patientId, 
      patientName: appointment.patientName,
      age: matchedPatient?.age || "N/A",
      time: appointment.visitDate || "N/A",
      diagnosis: appointment.prescription?.split(".")[0] || "N/A",
      type: "CONSULTING",
    };
  });

  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
      width: 50,
      align: "center",
    },
    {
      title: "Patient Name",
      dataIndex: "patientName",
      key: "patientName",
      render: (text) => (
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full bg-gray-200" />
          <span>{text}</span>
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
      width: 100,
      align: "center",
    },
    {
      title: "Diagnosis",
      dataIndex: "diagnosis",
      key: "diagnosis",
      width: 120,
      align: "center",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 120,
      align: "center",
      render: (text) => (
        <span
          className={`inline-block px-2 py-1 text-[10px] font-semibold rounded ${
            text === "GENERAL" ? "bg-yellow-100 text-yellow-800" : "bg-blue-100 text-blue-800"
          }`}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      align: "center",
      render: (_, record) => (
        <div className="flex justify-center space-x-2">
          <button
            onClick={() => navigate(`/patients/detail/${record.patientId}`)}
            
          >
            <EyeOutlined />
          </button>
          <button
            onClick={() => console.log(`Delete appointment ${record.key}`)}
            
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
      <Table
        columns={columns}
        dataSource={appointments}
        pagination={{
          pageSize: 5,
          showSizeChanger: false,
          position: ["bottomRight"],
        }}
        className="ant-table-small"
        rowClassName="text-[12px]"
        scroll={{ x: "max-content" }}
      />
    </div>
  );
}
