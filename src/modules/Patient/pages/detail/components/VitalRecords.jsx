import { useSelector } from 'react-redux';
import ReusableTable from '../../../../../components/ui/SharedTable';
import { Heart, Thermometer, Activity, AlertTriangle, Droplet, Wind, Weight, BarChart2 } from 'lucide-react';
import VitalCard from '../ui/VitalCard';

// Metric Configurations
const metricConfig = [
  {
    metric: 'Systolic BP',
    icon: Heart,
    colorScheme: 'red',
    unit: 'mmHg',
    getSecondary: (todayVital) => ({
      value: todayVital?.heartRate,
      unit: 'bpm',
      label: 'HR'
    })
  },
  {
    metric: 'Diastolic BP',
    icon: Heart,
    colorScheme: 'green',
    unit: 'mmHg'
  },
  {
    metric: 'Heart Rate',
    icon: Activity,
    colorScheme: 'purple',
    unit: 'bpm'
  },
  {
    metric: 'Temperature',
    icon: Thermometer,
    colorScheme: 'blue',
    unit: '°F',
    getSecondary: (todayVital) => ({
      value: todayVital?.respiratoryRate,
      unit: '/min',
      label: 'RR'
    })
  },
  {
    metric: 'Respiratory Rate',
    icon: Wind,
    colorScheme: 'orange',
    unit: '/min'
  },
  {
    metric: 'Oxygen Saturation',
    icon: Droplet,
    colorScheme: 'green',
    unit: '%'
  },
  {
    metric: 'Pain Level',
    icon: AlertTriangle,
    colorScheme: 'yellow',
    unit: '/10'
  },
  {
    metric: 'Weight',
    icon: Weight,
    colorScheme: 'gray',
    unit: 'lbs'
  },
  {
    metric: 'Blood Glucose',
    icon: Droplet,
    colorScheme: 'orange',
    unit: 'mg/dL'
  },
  {
    metric: 'BMI',
    icon: BarChart2,
    colorScheme: 'gray',
    unit: ''
  }
];

export default function VitalRecords({ patient }) {
  // Fetch vitals and pagination from Redux store
  const { vitals, pagination } = useSelector((state) => state.nursing);

  // Find today's vital record and previous records
  const today = "2025-06-12"; // Current date as per system
  const todayVital = vitals?.find((v) => v.patientName === patient?.name && v.date === today);
  const previousVitals = vitals?.filter((v) => v.patientName === patient?.name && v.date !== today) || [];

  // Column data for today's vitals
  const columnData = todayVital
    ? [
        { metric: 'Systolic BP', value: parseInt(todayVital.bloodPressure.split('/')[0]) || 0 },
        { metric: 'Diastolic BP', value: parseInt(todayVital.bloodPressure.split('/')[1]) || 0 },
        { metric: 'Heart Rate', value: parseInt(todayVital.heartRate) || 0 },
        { metric: 'Temperature', value: parseFloat(todayVital.temperature) || 0 },
        { metric: 'Respiratory Rate', value: parseInt(todayVital.respiratoryRate) || 0 },
        { metric: 'Oxygen Saturation', value: parseInt(todayVital.oxygenSaturation) || 0 },
        { metric: 'Pain Level', value: parseInt(todayVital.painLevel) || 0 },
        { metric: 'Weight', value: parseInt(todayVital.weight) || 0 },
        { metric: 'Blood Glucose', value: parseInt(todayVital.bloodGlucose) || 0 },
        { metric: 'BMI', value: parseFloat(todayVital.bmi) || 0 },
      ].filter((item) => item.value > 0)
    : [];

  // Table headers (excluding actions)
  const headers = [
    { key: 'date', label: 'Date' },
    { key: 'bloodPressure', label: 'Blood Pressure' },
    { key: 'heartRate', label: 'Heart Rate' },
    { key: 'temperature', label: 'Temperature' },
    { key: 'respiratoryRate', label: 'Respiratory Rate' },
    { key: 'oxygenSaturation', label: 'Oxygen Saturation' },
    { key: 'painLevel', label: 'Pain Level' },
    { key: 'weight', label: 'Weight' },
    { key: 'bloodGlucose', label: 'Blood Glucose' },
    { key: 'bmi', label: 'BMI' },
    { key: 'status', label: 'Status' },
  ];

  // Render cell function for custom formatting
  const renderCell = (key, item) => {
    switch (key) {
      case 'heartRate':
        return `${item[key]} bpm`;
      case 'temperature':
        return `${item[key]}°F`;
      case 'respiratoryRate':
        return `${item[key]}/min`;
      case 'oxygenSaturation':
        return `${item[key]}%`;
      case 'painLevel':
        return `${item[key]}/10`;
      case 'weight':
        return `${item[key]} lbs`;
      case 'bloodGlucose':
        return `${item[key]} mg/dL`;
      case 'bmi':
        return `${item[key]}`;
      default:
        return null;
    }
  };

  // Status color function
  const getStatusColor = (status) => {
    switch (status) {
      case 'Recorded':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Pagination config
  const tablePagination = {
    page: pagination.page,
    limit: pagination.limit,
    total: previousVitals.length, // Use filtered data length
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 text-[12px]">
      {/* Vitals Section */}
      <div className="grid grid-cols-1 gap-6">
        {/* Today's Vitals Cards */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-4">Today's Vitals</h4>
          {columnData.length > 0 ? (
            <div className="grid grid-cols-6 gap-4 mb-4">
              {columnData.map((item) => {
                const config = metricConfig.find((m) => m.metric === item.metric);
                if (!config) return null;

                const secondary = config.getSecondary ? config.getSecondary(todayVital) : null;

                return (
                  <VitalCard
                    key={item.metric}
                    metric={item.metric}
                    value={item.value}
                    unit={config.unit}
                    secondaryValue={secondary?.value}
                    secondaryUnit={secondary?.label ? `${secondary.label}: ${secondary.value} ${secondary.unit}` : secondary?.unit}
                    icon={config.icon}
                    colorScheme={config.colorScheme}
                  />
                );
              })}
            </div>
          ) : (
            <p className="text-gray-600">No vital records available for today.</p>
          )}
        </div>

        {/* Previous Vitals Table */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-4">Previous Vitals</h4>
          <ReusableTable
            headers={headers}
            data={previousVitals}
            getStatusColor={getStatusColor}
            renderCell={renderCell}
            keyField="id"
            pagination={tablePagination}
          />
        </div>
      </div>
    </div>
  );
}