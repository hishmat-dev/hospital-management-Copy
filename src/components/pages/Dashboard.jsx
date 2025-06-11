import React from "react";
import { useSelector } from "react-redux";
import { Users, Calendar, Bed, UserCheck, AlertTriangle, Activity } from "lucide-react";
import { Table, Tag } from "antd";
import { Bar } from "@ant-design/plots";
import { useBedListing } from "../../modules/Bed/pages/listing/listing.hooks";
import StatsCards from "../../modules/Bed/pages/listing/components/StatsCards";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const { stats, specialties, recentPatients } = useSelector((state) => state.dashboard || {});

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

  // Bar chart configuration for specialties
  const barConfig = {
    data: specialties
      ? [
          ...specialties.map((item) => ({
            name: item.name,
            value: item.patients,
            type: "Patients",
          })),
          ...specialties.map((item) => ({
            name: item.name,
            value: item.doctors,
            type: "Doctors",
          })),
        ]
      : [
          { name: "Cardiology", value: 50, type: "Patients" },
          { name: "Cardiology", value: 10, type: "Doctors" },
          { name: "Neurology", value: 40, type: "Patients" },
          { name: "Neurology", value: 8, type: "Doctors" },
          { name: "Orthopedics", value: 30, type: "Patients" },
          { name: "Orthopedics", value: 6, type: "Doctors" },
          { name: "Pediatrics", value: 60, type: "Patients" },
          { name: "Pediatrics", value: 12, type: "Doctors" },
          { name: "General Surgery", value: 45, type: "Patients" },
          { name: "General Surgery", value: 9, type: "Doctors" },
        ],
    xField: "name",
    yField: "value",
    seriesField: "type",
    isGroup: true,
    legend: { position: "bottom" },
    tooltip: {
      showMarkers: true,
      formatter: (datum) => ({
        name: datum.type,
        value: datum.value !== undefined ? datum.value : "N/A", // Handle undefined values
      }),
    },
    color: ["#5B8FF9", "#5AD8A6"], // Blue for Patients, Green for Doctors
  };

  return (
    <div className="space-y-6 text-[12px]">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-xl font-bold text-gray-900 mb-2">Hospital Dashboard</h1>
        <p className="text-gray-600">Welcome to TapMed Hospital Management System</p>
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
        {/* Available Specialties (Grouped Bar Chart) */}
        <div className="bg-white rounded-lg shadow-md p-3">
          <h2 className="font-bold text-gray-900 mb-4">Available Specialties</h2>
          {specialties && specialties.length > 0 ? (
            <Bar {...barConfig} />
          ) : (
            <p className="text-gray-600">No specialties data available</p>
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