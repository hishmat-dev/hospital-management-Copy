export const listingConfig = {
  triageLevels: [
    { value: "1", label: "Level 1 - Critical", color: "text-red-600" },
    { value: "2", label: "Level 2 - Emergency", color: "text-orange-600" },
    { value: "3", label: "Level 3 - Urgent", color: "text-yellow-600" },
    { value: "4", label: "Level 4 - Semi-urgent", color: "text-green-600" },
    { value: "5", label: "Level 5 - Non-urgent", color: "text-blue-600" },
  ],
  severities: [
    { value: "critical", label: "Critical", color: "text-red-600" },
    { value: "high", label: "High", color: "text-orange-600" },
    { value: "moderate", label: "Moderate", color: "text-yellow-600" },
    { value: "low", label: "Low", color: "text-green-600" },
  ],
  statuses: ["Waiting", "In Treatment", "Admitted", "Discharged", "Transferred"],
  arrivalModes: ["Walk-in", "Ambulance", "Police", "Helicopter", "Private Vehicle", "Transfer"],
  sortOptions: [
    { value: "triage", label: "Sort by Triage Level" },
    { value: "arrival", label: "Sort by Arrival Time" },
    { value: "status", label: "Sort by Status" },
    { value: "patient", label: "Sort by Patient Name" },
  ],
  pagination: {
    defaultLimit: 12,
    limitOptions: [12, 24, 48, 96],
  },
};