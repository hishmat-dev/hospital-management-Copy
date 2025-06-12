import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Users, Calendar, Bed, Table as TableIcon, UserCheck, AlertTriangle, Activity } from 'lucide-react';
import { Table, Tag } from 'antd';
import { Line } from '@ant-design/plots';
import { useBedListing } from '../../modules/Bed/pages/listing/listing.hooks';
import StatsCards from '../../modules/Bed/pages/listing/components/StatsCards';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const { stats = {}, recentPatients = [] } = useSelector((state) => state.dashboard || {});

  // Dummy patient data for previous 12 months (July 2024 to June 2025)
  const patientData = [
    { month: 'Jul 2024', patients: 130 },
    { month: 'Aug 2024', patients: 140 },
    { month: 'Sep 2024', patients: 160 },
    { month: 'Oct 2024', patients: 175 },
    { month: 'Nov 2024', patients: 190 },
    { month: 'Dec 2024', patients: 165 },
    { month: 'Jan 2025', patients: 180 },
    { month: 'Feb 2025', patients: 160 },
    { month: 'Mar 2025', patients: 200 },
    { month: 'Apr 2025', patients: 210 },
    { month: 'May 2025', patients: 235 },
    { month: 'Jun 2025', patients: 245 },
  ];

  // Log patient data to debug
  useEffect(() => {
    // console.log('Patient data for graph:', patientData);
    patientData.forEach((item, index) => {
      if (item.month == null || item.patients == null) {
        console.warn(`Undefined data at index ${index}:`, item);
      }
    });
  }, []);

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
          {React.cloneElement(icon, { size: 24, className: 'text-primary-color' })}
        </div>
      </div>
    </div>
  );

  // Status color for patient tags
  const getStatusColor = (status) => {
    switch (status) {
      case 'Admitted':
        return 'blue';
      case 'Discharged':
        return 'green';
      case 'Outpatient':
        return 'gold';
      default:
        return 'default';
    }
  };

  // Columns for Recent Patients Table
  const patientColumns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Department', dataIndex: 'department', key: 'department' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Tag color={getStatusColor(status)}>{status}</Tag>,
    },
  ];

  const { occupancyStats } = useBedListing();

  const handleAppointmentList = () => {
    navigate('/appointments/list');
  };

  // Line chart configuration with DemoLine styling
  const lineConfig = {
    data: patientData,
    xField: 'month',
    yField: 'patients',
    height: 400,
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
      stroke: '#4c51bf', // Indigo-700
    },
    area: {
      style: {
        fill: 'rgba(75, 85, 199, 0.1)', // Indigo-100
      },
    },
    xAxis: {
      label: {
        autoRotate: true,
        style: { fontSize: 10 },
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
        <StatCard icon={<Users />} title="Total Patients" value={stats.totalPatients || 0} />
        <StatCard
          icon={<Calendar />}
          title="Today's Appointments"
          value={stats.todaysAppointments || 0}
          onClick={handleAppointmentList}
        />
        <StatCard icon={<Bed />} title="Available Beds" value={stats.availableBeds || 0} />
        <StatCard icon={<UserCheck />} title="Doctors On Duty" value={stats.doctorsOnDuty || 0} />
        <StatCard icon={<AlertTriangle />} title="Emergency Cases" value={stats.emergencyCases || 0} />
        <StatCard icon={<Activity />} title="Surgeries Today" value={stats.surgeriesToday || 0} />
      </div>

      <StatsCards occupancyStats={occupancyStats} />

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-[12px]">
        {/* Monthly Patient Records (Line Chart) */}
        <div className="bg-white rounded-lg shadow-md p-3">
          <h2 className="font-bold text-gray-900 mb-4">Monthly Patient Records (Jul 2024 - Jun 2025)</h2>
          {patientData.length > 0 ? (
            <div style={{ height: '400px' }}>
              <Line {...lineConfig} />
            </div>
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
              dataSource={recentPatients || []}
              rowKey={(record) => record.id || record.name}
              pagination={false}
              className="ant-table-custom"
              scroll={{ x: 'max-content' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;