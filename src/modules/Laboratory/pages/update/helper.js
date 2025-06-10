export const initializeFormData = (initialData) => ({
  patientName: initialData?.patientName || "",
  patientId: initialData?.patientId || "",
  patientAge: initialData?.patientAge || "",
  patientGender: initialData?.patientGender || "",
  testType: initialData?.testType || "",
  category: initialData?.category || "",
  priority: initialData?.priority || "normal",
  status: initialData?.status || "pending",
  payment: initialData?.payment || "pending",
  doctorName: initialData?.doctorName || "",
  department: initialData?.department || "",
  orderedDate: initialData?.orderedDate || "",
  sampleDate: initialData?.sampleDate || "",
  expectedDate: initialData?.expectedDate || "",
  results: initialData?.results || [],
  notes: initialData?.notes || "",
  selectedTemplate: initialData?.selectedTemplate || "",
});

export const filterTemplates = (labTemplates, testType) => {
  if (!testType || !labTemplates) return [];
  return labTemplates.filter(
    (template) =>
      template.name.toLowerCase().includes(testType.toLowerCase()) ||
      template.category.toLowerCase().includes(testType.toLowerCase())
  );
};

export const loadTemplateResults = (labTemplates, selectedTemplateId) => {
  const template = labTemplates.find((t) => t.id === selectedTemplateId);
  if (!template) return [];
  return template.parameters.map((param) => ({
    name: param.name,
    unit: param.unit,
    normalRange: param.normalRange,
    value: "",
  }));
};

export const updateResult = (results, index, field, value) => {
  const updatedResults = [...results];
  updatedResults[index] = {
    ...updatedResults[index],
    [field]: value,
  };
  return updatedResults;
};