export const listingConfig = {
  departments: ["Cardiology", "Orthopedics", "Neurology", "Pediatrics", "Oncology", "ICU", "Emergency", "Surgery"],

  statuses: ["Available", "Occupied", "Maintenance", "Reserved"],

  floors: ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor", "4th Floor", "5th Floor"],

  types: ["General", "Private", "ICU", "NICU", "CCU", "Isolation", "Emergency"],

  sortOptions: [
    { value: "room", label: "Sort by Room" },
    { value: "status", label: "Sort by Status" },
    { value: "department", label: "Sort by Department" },
    { value: "type", label: "Sort by Type" },
  ],

  pagination: {
    defaultLimit: 12,
    limitOptions: [12, 24, 48, 96],
  },
}
