export const createConfig = {
  initialFormData: {
    patientName: "",
    patientAge: "",
    patientGender: "",
    patientPhone: "",
    patientAddress: "",
    emergencyContact: "",
    emergencyContactPhone: "",
    chiefComplaint: "",
    triageLevel: "",
    arrivalMode: "",
    arrivalTime: "",
    bloodPressure: "",
    heartRate: "",
    temperature: "",
    respiratoryRate: "",
    oxygenSaturation: "",
    painLevel: "",
    consciousness: "",
    allergies: "",
    currentMedications: "",
    medicalHistory: "",
    notes: "",
  },

  triageLevels: [
    { value: "1", label: "Level 1 - Resuscitation (Red)", color: "text-red-600" },
    { value: "2", label: "Level 2 - Emergency (Orange)", color: "text-orange-600" },
    { value: "3", label: "Level 3 - Urgent (Yellow)", color: "text-yellow-600" },
    { value: "4", label: "Level 4 - Semi-urgent (Green)", color: "text-green-600" },
    { value: "5", label: "Level 5 - Non-urgent (Blue)", color: "text-blue-600" },
  ],

  arrivalModes: ["Walk-in", "Ambulance", "Police", "Helicopter", "Private Vehicle", "Transfer"],

  consciousnessLevels: ["Alert", "Verbal", "Pain", "Unresponsive"],

  genders: ["Male", "Female", "Other"],
}
