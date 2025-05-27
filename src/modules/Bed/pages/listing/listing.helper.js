export const listingHelper = {
  getStatusColor: (status) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800"
      case "Occupied":
        return "bg-red-100 text-red-800"
      case "Maintenance":
        return "bg-yellow-100 text-yellow-800"
      case "Reserved":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  },

  getTypeColor: (type) => {
    switch (type) {
      case "ICU":
        return "bg-red-100 text-red-800"
      case "Private":
        return "bg-purple-100 text-purple-800"
      case "General":
        return "bg-blue-100 text-blue-800"
      case "NICU":
        return "bg-pink-100 text-pink-800"
      case "CCU":
        return "bg-orange-100 text-orange-800"
      case "Isolation":
        return "bg-yellow-100 text-yellow-800"
      case "Emergency":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  },

  exportToCSV: (beds) => {
    const headers = [
      "ID",
      "Room",
      "Bed",
      "Floor",
      "Department",
      "Type",
      "Status",
      "Patient",
      "Assigned Date",
      "Daily Rate",
      "Features",
    ]
    const csvContent = [
      headers.join(","),
      ...beds.map((bed) =>
        [
          bed.id,
          bed.roomNumber,
          bed.bedNumber,
          bed.floor,
          bed.department,
          bed.type,
          bed.status,
          bed.patientName || "N/A",
          bed.assignedDate || "N/A",
          bed.dailyRate || "N/A",
          `"${(bed.features || []).join(", ")}"`,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `beds_${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  },

  filterBeds: (beds, filters) => {
    return beds.filter((bed) => {
      const matchesSearch =
        !filters.search ||
        bed.roomNumber.toLowerCase().includes(filters.search.toLowerCase()) ||
        bed.patientName?.toLowerCase().includes(filters.search.toLowerCase()) ||
        bed.department.toLowerCase().includes(filters.search.toLowerCase())

      const matchesStatus = !filters.status || bed.status === filters.status
      const matchesDepartment = !filters.department || bed.department === filters.department
      const matchesFloor = !filters.floor || bed.floor === filters.floor
      const matchesType = !filters.type || bed.type === filters.type

      return matchesSearch && matchesStatus && matchesDepartment && matchesFloor && matchesType
    })
  },

  sortBeds: (beds, sortBy) => {
    return [...beds].sort((a, b) => {
      switch (sortBy) {
        case "room":
          return a.roomNumber.localeCompare(b.roomNumber)
        case "status":
          return a.status.localeCompare(b.status)
        case "department":
          return a.department.localeCompare(b.department)
        case "type":
          return a.type.localeCompare(b.type)
        default:
          return 0
      }
    })
  },
}
