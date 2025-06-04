import React from 'react';
import { Table } from 'antd';
import { FileTextOutlined, EyeOutlined, DownloadOutlined } from '@ant-design/icons';

const Reports = ({ patient }) => {
  const columns = [
    {
      title: '#',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'File',
      key: 'file',
      render: () => <FileTextOutlined className="text-primary-color text-lg" />,
    },
    {
      title: 'Reports Link',
      dataIndex: 'reportLink',
      key: 'reportLink',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
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
      number: 1,
      reportLink: 'Reports 1 clinical documentation',
      date: 'May-28, 2024',
    },
    {
      key: '2',
      number: 2,
      reportLink: 'Reports 2 random files documentation',
      date: 'Mar-20, 2024',
    },
    {
      key: '3',
      number: 3,
      reportLink: 'Reports 3 glucose level complete report',
      date: 'Feb-18, 2024',
    },
  ];

  return (
    <div className="bg-white text-[12px] rounded-lg shadow-md p-3 border border-gray-200">
      <h2 className="font-semibold text-gray-800 mb-4">Reports</h2>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        size='small'
        rowKey="key"
        className="reports-table"
      />
    </div>
  );
};

export default Reports;