export const listingHelper = {
  getStatusColor: (status) => {
    switch (status) {
      case "Recorded":
        return "bg-blue-100 text-blue-800"
      case "Reviewed":
        return "bg-green-100 text-green-800"
      case "Flagged":
        return "bg-red-100 text-red-800"
      case "Normal":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  },

  getShiftColor: (shift) => {
    switch (shift) {
      case "Day Shift":
        return "bg-yellow-100 text-yellow-800"
      case "Evening Shift":
        return "bg-orange-100 text-orange-800"
      case "Night Shift":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  },

  exportToCSV: (vitals) => {
    const headers = [
      "ID",
      "Patient",
      "Room",
      "Blood Pressure",
      "Heart Rate",
      "Temperature",
      "Date",
      "Time",
      "Shift",
      "Recorded By",
    ]
    const csvContent = [
      headers.join(","),
      ...vitals.map((vital) =>
        [
          vital.id,
          vital.patientName,
          vital.patientRoom,
          vital.bloodPressure || "N/A",
          vital.heartRate || "N/A",
          vital.temperature || "N/A",
          vital.recordedDate,
          vital.recordedTime,
          vital.shift,
          vital.recordedBy,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `nursing-vitals-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  },
}
