export const listingConfig = {
  bloodGroups: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],

  statuses: ["Admitted","Discharged", "Inactive", "Under Treatment"],

  genders: ["Male", "Female", "Other"],

  sortOptions: [
    { value: "name", label: "Sort by Name" },
    { value: "date", label: "Sort by Registration Date" },
    { value: "age", label: "Sort by Age" },
    { value: "status", label: "Sort by Status" },
  ],

  pagination: {
    defaultLimit: 10,
    limitOptions: [10, 25, 50, 100],
  },
}
