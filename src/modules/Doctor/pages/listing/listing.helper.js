export const listingHelper = {
  getSpecialtyColor: (specialty) => {
    const colors = {
      Cardiology: "bg-red-100 text-red-800",
      Neurology: "bg-purple-100 text-purple-800",
      Orthopedics: "bg-blue-100 text-blue-800",
      Pediatrics: "bg-green-100 text-green-800",
      Dermatology: "bg-yellow-100 text-yellow-800",
      Psychiatry: "bg-indigo-100 text-indigo-800",
      Radiology: "bg-gray-100 text-gray-800",
      "Emergency Medicine": "bg-orange-100 text-orange-800",
    }
    return colors[specialty] || "bg-gray-100 text-gray-800"
  },

  getStatusColor: (status) => {
    const colors = {
      Active: "bg-green-100 text-green-800",
      Inactive: "bg-red-100 text-red-800",
      "On Leave": "bg-yellow-100 text-yellow-800",
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  },

  exportToCSV: (doctors) => {
    const headers = ["ID", "Name", "Specialty", "Phone", "Email", "Status", "Experience"]
    const csvContent = [
      headers.join(","),
      ...doctors.map((doctor) =>
        [doctor.id, doctor.name, doctor.specialty, doctor.phone, doctor.email, doctor.status, doctor.experience].join(
          ",",
        ),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `doctors-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  },
}
