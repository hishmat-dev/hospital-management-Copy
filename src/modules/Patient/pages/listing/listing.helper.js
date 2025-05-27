export const listingHelper = {
  getStatusColor: (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Inactive":
        return "bg-gray-100 text-gray-800"
      case "Discharged":
        return "bg-blue-100 text-blue-800"
      case "Transferred":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  },

  getBloodGroupColor: (bloodGroup) => {
    const colors = {
      "A+": "bg-red-100 text-red-800",
      "A-": "bg-red-50 text-red-700",
      "B+": "bg-blue-100 text-blue-800",
      "B-": "bg-blue-50 text-blue-700",
      "AB+": "bg-purple-100 text-purple-800",
      "AB-": "bg-purple-50 text-purple-700",
      "O+": "bg-orange-100 text-orange-800",
      "O-": "bg-orange-50 text-orange-700",
    }
    return colors[bloodGroup] || "bg-gray-100 text-gray-800"
  },

  exportToCSV: (patients) => {
    const headers = ["ID", "Name", "Age", "Gender", "Phone", "Email", "Blood Group", "Status"]
    const csvContent = [
      headers.join(","),
      ...patients.map((patient) =>
        [
          patient.id,
          patient.name,
          patient.age || "N/A",
          patient.gender,
          patient.phone,
          patient.email || "N/A",
          patient.bloodGroup,
          patient.status,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `patients-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  },
}
