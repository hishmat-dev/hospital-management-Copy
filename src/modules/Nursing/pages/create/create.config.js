export const createConfig = {
  initialFormData: {
    patientId: "",
    patientName: "",
    patientRoom: "",
    bloodPressure: "",
    heartRate: "",
    temperature: "",
    respiratoryRate: "",
    oxygenSaturation: "",
    painLevel: "",
    consciousness: "",
    mobility: "",
    skinCondition: "",
    recordedAt: new Date().toISOString().slice(0, 16), // Sets to YYYY-MM-DDTHH:mm (e.g., 2025-06-12T11:15)
    recordedBy: "",
    shift: "",
    notes: "",
    medications: "",
    allergies: "",
    specialInstructions: "",
  },

  consciousnessLevels: ["Alert", "Drowsy", "Confused", "Unresponsive"],

  mobilityLevels: ["Independent", "Assisted", "Bedbound", "Wheelchair"],

  skinConditions: ["Normal", "Dry", "Moist", "Rash", "Wound", "Pressure Sore"],

  shifts: ["Day Shift", "Evening Shift", "Night Shift"],

  temperatureUnits: ["°F", "°C"],
}
