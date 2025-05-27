export const listingHelper = {
  getTriageColor: (level) => {
    switch (level) {
      case "1":
        return "bg-red-100 text-red-800 border-red-200"
      case "2":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "3":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "4":
        return "bg-green-100 text-green-800 border-green-200"
      case "5":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  },

  getStatusColor: (status) => {
    switch (status) {
      case "Waiting":
        return "bg-yellow-100 text-yellow-800"
      case "In Treatment":
        return "bg-blue-100 text-blue-800"
      case "Admitted":
        return "bg-green-100 text-green-800"
      case "Discharged":
        return "bg-gray-100 text-gray-800"
      case "Transferred":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  },

  exportToCSV: (cases) => {
    const headers = [
      "ID",
      "Patient",
      "Age",
      "Triage Level",
      "Status",
      "Arrival Time",
      "Chief Complaint",
      "Assigned Doctor",
    ]
    const csvContent = [
      headers.join(","),
      ...cases.map((case_) =>
        [
          case_.id,
          case_.patientName,
          case_.patientAge,
          case_.triageLevel,
          case_.status,
          case_.arrivalTime,
          `"${case_.chiefComplaint}"`,
          case_.assignedDoctor || "N/A",
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `emergency-cases-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  },
}
