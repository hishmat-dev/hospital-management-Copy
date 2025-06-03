export const createConfig = {
  initialFormData: {
    name: "",
    dateOfBirth: "",
    date: new Date().toISOString().split("T")[0],
    gender: "",
    nationality: "",
    languages: "",
    phone: "",
    email: "",
    address: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    bloodGroup: "",
    allergies: "",
    medicalHistory: "",
    currentMedications: "",
    insuranceProvider: "",
    insuranceNumber: "",
    age: "", 
    maritalStatus: "", 
  },

  bloodGroups: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],

  genders: ["Male", "Female", "Other"],

  insuranceProviders: [
    "Blue Cross Blue Shield",
    "Aetna",
    "Cigna",
    "UnitedHealth",
    "Humana",
    "Kaiser Permanente",
    "Other",
  ],
}
