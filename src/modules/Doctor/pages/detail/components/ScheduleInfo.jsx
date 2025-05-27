export default function ScheduleInfo({ doctor }) {
  const schedule = doctor?.schedule || {}

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Schedule & Availability</h3>
      <div className="space-y-3">
        {Object.entries(schedule).map(([day, times]) => (
          <div key={day} className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="font-medium text-gray-700 capitalize">{day}</span>
            <span className="text-gray-900">{times ? `${times.start} - ${times.end}` : "Not Available"}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
