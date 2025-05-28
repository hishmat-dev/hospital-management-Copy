export const listingConfig = {
  specialties: [
    "Cardiology",
    "Orthopedics",
    "Neurology",
    "Pediatrics",
    "Oncology",
    "Dermatology",
    "Emergency Medicine",
    "Internal Medicine",
    "Surgery",
  ],

  departments: ["Cardiology", "Orthopedics", "Neurology", "Pediatrics", "Oncology", "Dermatology", "Emergency"],

  statuses: ["Active", "Inactive", "On Leave"],
  sortOptions: [
    { value: "name", label: "Sort by Name" },
    { value: "specialty", label: "Sort by Specialty" },
    { value: "experience", label: "Sort by Experience" },
    { value: "status", label: "Sort by Status" },
  ],
  availabilities: ["Available", "On Duty", "Busy"],
  pagination: {
    defaultLimit: 10,
    limitOptions: [10, 25, 50, 100],
  },
}
