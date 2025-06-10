import React from "react";
import { useSelector } from "react-redux";
import { Users, Calendar, Bed, UserCheck, AlertTriangle, Activity } from "lucide-react";
// import { fetchDashboardStats, fetchSpecialties, fetchRecentPatients } from "../../store/slices/dashboardSlice";
import { Table, Tag } from "antd"; // Import Ant Design components
import { useBedListing } from "../../modules/Bed/pages/listing/listing.hooks";
import StatsCards from "../../modules/Bed/pages/listing/components/StatsCards"
import { useNavigate } from "react-router-dom";
export default function Dashboard() {

  const navigate = useNavigate();
  const { stats, specialties, recentPatients } = useSelector((state) => state.dashboard || {});

  // Dispatch thunks when the component mounts

  const StatCard = ({ icon, title, value, onClick }) => (
    <div className="bg-white rounded-lg shadow-md p-4 border-l-4 hover:cursor-pointer border-l-primary-color " onClick={onClick}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[12px] font-medium text-gray-600">{title}</p>
          <p className="text-xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="p-3 rounded-full  ">
          {React.cloneElement(icon, { size: 24, className: `text-primary-color` })}
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
  const { occupancyStats } = useBedListing()

  const handleAppointmentList = () => {
    navigate("/appointments/list")
  }
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
        <StatCard icon={<Calendar />} title="Today's Appointments" value={stats.todaysAppointments} onClick={handleAppointmentList} />
        <StatCard icon={<Bed />} title="Available Beds" value={stats.availableBeds} />
        <StatCard icon={<UserCheck />} title="Doctors On Duty" value={stats.doctorsOnDuty} />
        <StatCard icon={<AlertTriangle />} title="Emergency Cases" value={stats.emergencyCases} />
        <StatCard icon={<Activity />} title="Surgeries Today" value={stats.surgeriesToday} />
      </div>

      <StatsCards occupancyStats={occupancyStats} />
      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-[12px]">
        {/* Available Specialties */}
        <div className="bg-white rounded-lg shadow-md p-3">
          <h2 className="font-bold text-gray-900 mb-4">Available Specialties</h2>
          <Table
            columns={specialtyColumns}
            dataSource={specialties}
            rowKey={(record, index) => index} // Use index as key since no unique key is provided
            pagination={false}
            className="ant-table-custom"
          />
        </div>

        {/* Recent Patients */}
        <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 md:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Recent Patients</h2>
          <div className="overflow-x-auto">
            <Table
              columns={patientColumns}
              dataSource={recentPatients}
              rowKey={(record, index) => index}
              pagination={false}
              className="ant-table-custom"
              scroll={{ x: "max-content" }} // Enable horizontal scrolling on small screens
            />
          </div>
        </div>

      </div>
    </div >
  );
}