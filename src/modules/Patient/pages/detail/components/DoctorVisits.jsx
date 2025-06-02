import React from 'react';
import { Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FileTextOutlined, EyeOutlined, DownloadOutlined } from '@ant-design/icons';

const DoctorVisits = ({ patient }) => {
  const navigate = useNavigate();

  const columns = [
    {
      title: 'Doctor',
      dataIndex: 'doctor',
      key: 'doctor',
      render: (text, record) => (
        <div className="flex items-center">
          <img
            src={record.avatar}
            alt={text}
            className="w-10 h-10 rounded-full mr-3"
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Reports',
      key: 'reports',
      render: () => (
        <button
        //   onClick={() => navigate('/appointments/list')}
          className="bg-primary-color text-white px-3 py-1 rounded transition"
        >
          View Reports
        </button>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <div className="flex space-x-2">
          <EyeOutlined className=" cursor-pointer" />
          <DownloadOutlined className=" cursor-pointer" />
        </div>
      ),
    },
  ];

  // Sample data (replace with actual data from patient prop)
  const data = [
    {
      key: '1',
      doctor: 'Dr. Hector',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      date: '20/05/2024',
      department: 'Dentist',
    },
    {
      key: '2',
      doctor: 'Dr. Mitchel',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      date: '20/05/2024',
      department: 'Urologist',
    },
    {
      key: '3',
      doctor: 'Dr. Fermin',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      date: '18/03/2024',
      department: 'Surgeon',
    },
  ];

  return (
    <div className="bg-white rounded-lg text-[12px] shadow-md p-3 border border-gray-200">
      <h2 className="font-semibold text-gray-800 mb-4">Doctor Visits</h2>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        size='small'
        rowKey="key"
        className="doctor-visits-table"
      />
    </div>
  );
};

export default DoctorVisits;