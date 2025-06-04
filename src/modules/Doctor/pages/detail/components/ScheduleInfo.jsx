export default function ScheduleInfo({ doctor }) {
  const schedule = doctor?.schedule || {};

  const hasSchedule = Object.keys(schedule).length > 0;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Schedule & Availability</h3>

      {hasSchedule ? (
        <div className="space-y-3">
          {Object.entries(schedule).map(([day, timeRange]) => (
            <div
              key={day}
              className="flex justify-between items-center py-2 border-b border-gray-100"
            >
              <span className="font-medium text-gray-700 capitalize">{day}</span>
              <span className="text-gray-900">
                {timeRange?.trim() ? timeRange : "Not Available"}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">No schedule available.</p>
      )}
    </div>
  );
}
