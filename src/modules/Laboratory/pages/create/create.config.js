export const createConfig = {
  initialFormData: {
    patientId: "",
    patientName: "",
    patientAge: "",
    patientGender: "",
    testCategory: "",
    testType: "",
    priority: "Normal",
    orderingDoctor: "",
    department: "",
    sampleType: "",
    collectionDate: "",
    collectionTime: "",
    expectedResults: "",
    specialInstructions: "",
    notes: "",
  },

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

  testTypes: {
    Hematology: ["Complete Blood Count", "ESR", "Hemoglobin", "Platelet Count", "Blood Smear"],
    Biochemistry: ["Liver Function", "Kidney Function", "Lipid Profile", "Blood Sugar", "Electrolytes"],
    Microbiology: ["Blood Culture", "Urine Culture", "Stool Culture", "Throat Swab", "Wound Culture"],
    Immunology: ["HIV Test", "Hepatitis Panel", "Thyroid Function", "Autoimmune Panel"],
    Pathology: ["Biopsy", "Cytology", "Histopathology", "Fine Needle Aspiration"],
    Radiology: ["X-Ray", "CT Scan", "MRI", "Ultrasound", "Mammography"],
    Cardiology: ["ECG", "Echo", "Stress Test", "Holter Monitor"],
    Endocrinology: ["Diabetes Panel", "Hormone Levels", "Insulin Test", "Growth Hormone"],
  },

  priorities: ["Normal", "Urgent", "STAT", "Routine"],

  sampleTypes: ["Blood", "Urine", "Stool", "Saliva", "Tissue", "Swab", "Fluid"],

  departments: ["Laboratory", "Radiology", "Cardiology", "Pathology"],
}
