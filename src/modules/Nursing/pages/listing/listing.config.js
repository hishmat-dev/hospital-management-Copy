export const listingConfig = {
  shifts: ["Day Shift", "Evening Shift", "Night Shift"],

  statuses: ["Recorded", "Reviewed", "Flagged", "Normal"],

  consciousnessLevels: ["Alert", "Drowsy", "Confused", "Unresponsive"],

  alertLevels: [
    { value: "critical", label: "Critical", color: "text-red-600" },
    { value: "warning", label: "Warning", color: "text-yellow-600" },
    { value: "normal", label: "Normal", color: "text-green-600" },
  ],
  
  sortOptions: [
    { value: "date", label: "Sort by Date" },
    { value: "patient", label: "Sort by Patient" },
    { value: "shift", label: "Sort by Shift" },
    { value: "status", label: "Sort by Status" },
  ],

  pagination: {
    defaultLimit: 12,
    limitOptions: [12, 24, 48, 96],
  },
}
