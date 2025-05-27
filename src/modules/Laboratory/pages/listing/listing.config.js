export const listingConfig = {
  testCategories: [
    "Hematology",
    "Biochemistry",
    "Microbiology",
    "Immunology",
    "Pathology",
    "Radiology",
    "Cardiology",
    "Endocrinology",
  ],

  statuses: ["Pending", "In Progress", "Completed", "Cancelled", "On Hold"],

  priorities: ["Normal", "Urgent", "STAT", "Routine"],

  sortOptions: [
    { value: "date", label: "Sort by Date" },
    { value: "priority", label: "Sort by Priority" },
    { value: "status", label: "Sort by Status" },
    { value: "patient", label: "Sort by Patient" },
  ],

  pagination: {
    defaultLimit: 10,
    limitOptions: [10, 25, 50, 100],
  },
}
