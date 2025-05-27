export const listingConfig = {
  departments: ["Cardiology", "Orthopedics", "Neurology", "Pediatrics", "Oncology", "Dermatology", "Emergency"],

  statuses: ["Scheduled", "Confirmed", "In Progress", "Completed", "Cancelled", "No Show"],

  types: ["Consultation", "Follow-up", "Emergency", "Routine Checkup", "Surgery Consultation"],

  sortOptions: [
    { value: "date", label: "Sort by Date" },
    { value: "patient", label: "Sort by Patient" },
    { value: "doctor", label: "Sort by Doctor" },
    { value: "status", label: "Sort by Status" },
  ],

  pagination: {
    defaultLimit: 10,
    limitOptions: [10, 25, 50, 100],
  },
}
