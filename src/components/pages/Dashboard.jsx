import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Users, Calendar, Bed, UserCheck, AlertTriangle, Activity } from "lucide-react";
// import { fetchDashboardStats, fetchSpecialties, fetchRecentPatients } from "../../store/slices/dashboardSlice";
import { Table, Tag } from "antd"; // Import Ant Design components
import { useBedListing } from "../../modules/Bed/pages/listing/listing.hooks";
import StatsCards from "../../modules/Bed/pages/listing/components/StatsCards"
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { stats , specialties , recentPatients , fetched } = useSelector((state) => state.dashboard || {});

  console.log("Dashboard stats:");
  // Dispatch thunks when the component mounts

  const StatCard = ({ icon, title, value, color, onClick }) => (
    <div className="bg-white rounded-lg shadow-md p-4 border-l-4 hover:cursor-pointer" style={{ borderLeftColor: color }} onClick={onClick}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="p-3 rounded-full" style={{ backgroundColor: `${color}20` }}>
          {React.cloneElement(icon, { size: 24, color })}
        </div>
      </div>
    </div>
  );

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

  // Columns for Specialties Table
  const specialtyColumns = [
    {
      title: "Specialty",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Doctors",
      dataIndex: "doctors",
      key: "doctors",
    },
    {
      title: "Patients",
      dataIndex: "patients",
      key: "patients",
    },
  ];

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
      render: (status) => (
        <Tag color={getStatusColor(status)}>{status}</Tag>
      ),
    },
  ];
  const {occupancyStats} = useBedListing()
  
  const handleAppointmentList = () => {
    navigate("/appointments/list") 
  }
  return (

    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Hospital Dashboard</h1>
        <p className="text-gray-600">Welcome to TapMed Hospital Management System</p>
      </div>


      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        <StatCard icon={<Users />} title="Total Patients" value={stats.totalPatients} color="#3B82F6" />
        <StatCard icon={<Calendar />} title="Today's Appointments" value={stats.todaysAppointments} color="#10B981" onClick={handleAppointmentList} />
        <StatCard icon={<Bed />} title="Available Beds" value={stats.availableBeds} color="#8B5CF6" />
        <StatCard icon={<UserCheck />} title="Doctors On Duty" value={stats.doctorsOnDuty} color="#F59E0B" />
        <StatCard icon={<AlertTriangle />} title="Emergency Cases" value={stats.emergencyCases} color="#EF4444" />
        <StatCard icon={<Activity />} title="Surgeries Today" value={stats.surgeriesToday} color="#06B6D4" />
      </div>

      <StatsCards occupancyStats={occupancyStats} />
      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Available Specialties */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Available Specialties</h2>
          <Table
            columns={specialtyColumns}
            dataSource={specialties}
            rowKey={(record, index) => index} // Use index as key since no unique key is provided
            pagination={false}
            className="ant-table-custom"
          />
        </div>

        {/* Recent Patients */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Patients</h2>
          <Table
            columns={patientColumns}
            dataSource={recentPatients}
            rowKey={(record, index) => index} // Use index as key since no unique key is provided
            pagination={false}
            className="ant-table-custom"
          />
        </div>
      </div>
    </div>
  );
}