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
    recordedDate: "",
    recordedTime: "",
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
