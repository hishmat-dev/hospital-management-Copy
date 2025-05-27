export const listingHelper = {
  getStatusColor: (status) => {
    switch (status) {
      case "Scheduled":
        return "bg-blue-100 text-blue-800"
      case "Confirmed":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-yellow-100 text-yellow-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      case "No Show":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  },

  getTypeColor: (type) => {
    switch (type) {
      case "Consultation":
        return "bg-purple-100 text-purple-800"
      case "Follow-up":
        return "bg-orange-100 text-orange-800"
      case "Emergency":
        return "bg-red-100 text-red-800"
      case "Routine Checkup":
        return "bg-blue-100 text-blue-800"
      case "Surgery Consultation":
        return "bg-indigo-100 text-indigo-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  },

  exportToCSV: (appointments) => {
    const headers = ["ID", "Patient", "Doctor", "Department", "Date", "Time", "Type", "Status", "Priority", "Notes"]
    const csvContent = [
      headers.join(","),
      ...appointments.map((appointment) =>
        [
          appointment.id,
          appointment.patientName,
          appointment.doctorName,
          appointment.department,
          appointment.date,
          appointment.time,
          appointment.type,
          appointment.status,
          appointment.priority || "Normal",
          `"${appointment.notes || ""}"`,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `appointments_${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  },

  filterAppointments: (appointments, filters) => {
    return appointments.filter((appointment) => {
      const matchesSearch =
        !filters.search ||
        appointment.patientName.toLowerCase().includes(filters.search.toLowerCase()) ||
        appointment.doctorName.toLowerCase().includes(filters.search.toLowerCase()) ||
        appointment.id.toLowerCase().includes(filters.search.toLowerCase())

      const matchesStatus = !filters.status || appointment.status === filters.status
      const matchesDepartment = !filters.department || appointment.department === filters.department
      const matchesDate = !filters.date || appointment.date === filters.date

      return matchesSearch && matchesStatus && matchesDepartment && matchesDate
    })
  },

  sortAppointments: (appointments, sortBy) => {
    return [...appointments].sort((a, b) => {
      switch (sortBy) {
        case "patient":
          return a.patientName.localeCompare(b.patientName)
        case "doctor":
          return a.doctorName.localeCompare(b.doctorName)
        case "status":
          return a.status.localeCompare(b.status)
        case "date":
        default:
          const dateA = new Date(`${a.date} ${a.time}`)
          const dateB = new Date(`${b.date} ${b.time}`)
          return dateA - dateB
      }
    })
  },
}
