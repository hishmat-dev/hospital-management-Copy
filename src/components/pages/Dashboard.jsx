import React from "react";
import { useSelector } from "react-redux";
import { Users, Calendar, Bed, UserCheck, AlertTriangle, Activity } from "lucide-react";
import { Table, Tag } from "antd";
import { Pie } from "@ant-design/plots";
import { useBedListing } from "../../modules/Bed/pages/listing/listing.hooks";
import StatsCards from "../../modules/Bed/pages/listing/components/StatsCards";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const { stats, specialties, recentPatients } = useSelector((state) => state.dashboard || {});

  // Log specialties to debug
  React.useEffect(() => {
    console.log("Specialties data:", specialties);
  }, [specialties]);

  // StatCard component
  const StatCard = ({ icon, title, value, onClick }) => (
    <div
      className="bg-white rounded-lg shadow-md p-4 border-l-4 hover:cursor-pointer border-l-primary-color"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[12px] font-medium text-gray-600">{title}</p>
          <p className="text-xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="p-3 rounded-full">
          {React.cloneElement(icon, { size: 24, className: `text-primary-color` })}
        </div>
      </div>
    </div>
  );

  // Status color for patient tags
  const getStatusColor = (status) => {
    switch (status) {
      case "Admitted":
        return "blue";
      case "Discharged":
        return "green";
      case "Outpatient":
        return "gold";
      default:
        return "default";
    }
  };

  // Columns for Recent Patients Table
  const patientColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color={getStatusColor(status)}>{status}</Tag>,
    },
  ];

  const { occupancyStats } = useBedListing();

  const handleAppointmentList = () => {
    navigate("/appointments/list");
  };

  // Pie chart configuration for two-level chart
  const pieConfig = {
    data: specialties && specialties.length > 0
      ? [
          ...specialties.map((item) => ({
            type: "Outer",
            name: item.name || "Unknown",
            value: (item.patients || 0) + (item.doctors || 0), // Total value for label
            patients: item.patients || 0,
            doctors: item.doctors || 0,
            color: ["#5AD8A6", "#FAAD14", "#5B8FF9", "#FF4D4F", "#975FE4"][specialties.indexOf(item) % 5],
          })),
          ...specialties.map((item) => ({
            type: "Inner",
            name: item.name || "Unknown",
            value: (item.patients || 0) + (item.doctors || 0), // Total value for label
            patients: item.patients || 0,
            doctors: item.doctors || 0,
            color: ["#5AD8A6", "#FAAD14", "#5B8FF9", "#FF4D4F", "#975FE4"][specialties.indexOf(item) % 5],
          })),
        ]
      : [
          { type: "Outer", name: "Cardiology", value: 60, patients: 50, doctors: 10, color: "#5AD8A6" },
          { type: "Outer", name: "Neurology", value: 48, patients: 40, doctors: 8, color: "#FAAD14" },
          { type: "Outer", name: "Orthopedics", value: 36, patients: 30, doctors: 6, color: "#5B8FF9" },
          { type: "Outer", name: "Pediatrics", value: 72, patients: 60, doctors: 12, color: "#FF4D4F" },
          { type: "Outer", name: "General Surgery", value: 54, patients: 45, doctors: 9, color: "#975FE4" },
          { type: "Inner", name: "Cardiology", value: 60, patients: 50, doctors: 10, color: "#5AD8A6" },
          { type: "Inner", name: "Neurology", value: 48, patients: 40, doctors: 8, color: "#FAAD14" },
          { type: "Inner", name: "Orthopedics", value: 36, patients: 30, doctors: 6, color: "#5B8FF9" },
          { type: "Inner", name: "Pediatrics", value: 72, patients: 60, doctors: 12, color: "#FF4D4F" },
          { type: "Inner", name: "General Surgery", value: 54, patients: 45, doctors: 9, color: "#975FE4" },
        ],
    angleField: "value",
    colorField: "name",
    seriesField: "type",
    radius: 1,
    innerRadius: 0.6,
    legend: { position: "bottom" },
    label: {
      formatter: (datum) => datum?.value ? `${datum.value}` : "0", // Show total value or "0" if null
    },
    tooltip: {
      formatter: (datum) => ({
        name: datum.name,
        value: "",
        customHtml: `<div><p>${datum.type === "Outer" ? "Patients" : "Doctors"}: ${datum[datum.type === "Outer" ? "patients" : "doctors"] || 0}</p></div>`,
      }),
    },
    color: ({ name }) => {
      const colorMap = {
        Cardiology: "#5AD8A6",
        Neurology: "#FAAD14",
        Orthopedics: "#5B8FF9",
        Pediatrics: "#FF4D4F",
        "General Surgery": "#975FE4",
      };
      return colorMap[name] || "#ccc";
    },
    interactions: [{ type: "element-selected" }, { type: "element-active" }],
    statistic: {
      title: {
        formatter: () => "My Chart",
        style: { fontSize: 16, fontWeight: "bold" },
      },
      content: {
        style: { fontSize: 12 },
      },
    },
  };

  return (
    <div className="space-y-6 text-[12px]">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-xl font-bold text-gray-900 mb-2">Hospital Dashboard</h1>
        <p className="text-gray-600">Welcome to Workwise Hospital Management System</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        <StatCard icon={<Users />} title="Total Patients" value={stats.totalPatients} />
        <StatCard
          icon={<Calendar />}
          title="Today's Appointments"
          value={stats.todaysAppointments}
          onClick={handleAppointmentList}
        />
        <StatCard icon={<Bed />} title="Available Beds" value={stats.availableBeds} />
        <StatCard icon={<UserCheck />} title="Doctors On Duty" value={stats.doctorsOnDuty} />
        <StatCard icon={<AlertTriangle />} title="Emergency Cases" value={stats.emergencyCases} />
        <StatCard icon={<Activity />} title="Surgeries Today" value={stats.surgeriesToday} />
      </div>

      <StatsCards occupancyStats={occupancyStats} />

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-[12px]">
        {/* My Chart (Two-Level Pie Chart) */}
        <div className="bg-white rounded-lg shadow-md p-3">
          <h2 className="font-bold text-gray-900 mb-4">My Chart</h2>
          {specialties && specialties.length > 0 ? (
            <Pie {...pieConfig} />
          ) : (
            <p className="text-gray-600">No data available</p>
          )}
        </div>

        {/* Recent Patients */}
        <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 md:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Recent Patients</h2>
          <div className="overflow-x-auto">
            <Table
              columns={patientColumns}
              dataSource={recentPatients}
              rowKey={(record) => record.id || record.name} // Use id if available, fallback to name
              pagination={false}
              className="ant-table-custom"
              scroll={{ x: "max-content" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}