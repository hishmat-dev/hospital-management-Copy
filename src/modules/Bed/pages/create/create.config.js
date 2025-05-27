export const createConfig = {
  initialFormData: {
    roomNumber: "",
    bedNumber: "",
    floor: "",
    department: "",
    type: "",
    status: "Available",
    dailyRate: "",
    maxOccupancy: "1",
    features: [],
    description: "",
    specialInstructions: "",
  },

  floors: ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor", "4th Floor", "5th Floor"],

  departments: ["Cardiology", "Orthopedics", "Neurology", "Pediatrics", "Oncology", "ICU", "Emergency", "Surgery"],

  bedTypes: ["General", "Private", "ICU", "NICU", "CCU", "Isolation", "Emergency"],

  statuses: ["Available", "Occupied", "Maintenance", "Reserved"],

  features: [
    "Oxygen Supply",
    "Cardiac Monitor",
    "Ventilator",
    "IV Stand",
    "Bedside Table",
    "Privacy Curtain",
    "Call Button",
    "Adjustable Bed",
    "TV",
    "WiFi",
    "Air Conditioning",
    "Private Bathroom",
  ],
}
