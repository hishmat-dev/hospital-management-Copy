export const formConfig = {
  inputFields: [
    ["Patient Name", "patientName", "text"],
    ["Patient ID", "patientId", "text"],
    ["Patient Age", "patientAge", "number"],
    ["Patient Gender", "patientGender", "text"],
    ["Doctor Name", "doctorName", "text"],
    ["Department", "department", "text"],
    ["Payment", "payment", "number"],
    ["Ordered Date", "orderedDate", "date"],
    ["Sample Date", "sampleDate", "date"],
    ["Expected Date", "expectedDate", "date"],
  ],
  selectFields: [
    ["Priority", "priority", ["low", "normal", "high", "urgent"]],
    ["Status", "status", ["pending", "in-progress", "completed", "cancelled"]],
  ],
};

export const headersConfig = [
  { label: "Parameter", key: "name" },
  { label: "Observed Value", key: "value" },
  { label: "Unit", key: "unit" },
  { label: "Normal Range", key: "normalRange" },
];