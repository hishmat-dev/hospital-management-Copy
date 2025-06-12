// const getColorClass = (value, map, defaultClass = "bg-gray-100 text-gray-800") => {
//   return map[value] || defaultClass
// }

export const listingHelper = {
  getStatusColor: (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      case "On Hold":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  },

  getPriorityColor: (priority) => {
    switch (priority) {
      case "STAT":
        return "bg-red-100 text-red-800"
      case "Urgent":
        return "bg-orange-100 text-orange-800"
      case "Normal":
        return "bg-blue-100 text-blue-800"
      case "Routine":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  },

  exportToCSV: (labTests) => {
    const headers = [
      "ID",
      "Patient",
      "Test Type",
      "Category",
      "Priority",
      "Status",
      "Collection Date",
      "Ordering Doctor",
    ]
    const csvContent = [
      headers.join(","),
      ...labTests.map((test) =>
        [
          test.id,
          test.patientName,
          test.testType,
          test.testCategory,
          test.priority,
          test.status,
          test.collectionDate,
          test.orderingDoctor,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `lab-tests-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  },
  downloadReport: (test) => {
    const reportContent = `
Lab Test Report
---------------
Test ID: ${test.id}
Patient: ${test.patientName}
Test Type: ${test.testType}
Category: ${test.testCategory}
Priority: ${test.priority}
Status: ${test.status}
Collection Date: ${test.collectionDate}
Ordering Doctor: ${test.orderingDoctor}
Generated: ${new Date().toISOString()}
    `.trim()

    const blob = new Blob([reportContent], { type: "text/plain" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `lab-test-report-${test.id}-${new Date().toISOString().split("T")[0]}.txt`
    a.click()
    window.URL.revokeObjectURL(url)
  },

}

