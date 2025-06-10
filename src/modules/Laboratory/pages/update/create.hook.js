import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateLabTest } from "../../action/slice";
import { fetchLabTemplates } from "../../../Administrative/action/slice";

export const useLabForm = (initialData, isUpdate) => {
  const dispatch = useDispatch();
  const { labTemplates } = useSelector((state) => state.administrative);

  const [formData, setFormData] = useState({
    patientName: initialData?.patientName || "",
    patientId: initialData?.patientId || "",
    patientAge: initialData?.patientAge || "",
    patientGender: initialData?.patientGender || "",
    testType: initialData?.testType || "",
    category: initialData?.category || "",
    priority: initialData?.priority || "normal",
    status: initialData?.status || "pending",
    payment: initialData?.payment || "00",
    doctorName: initialData?.doctorName || "",
    department: initialData?.department || "",
    orderedDate: initialData?.orderedDate || "",
    sampleDate: initialData?.sampleDate || "",
    expectedDate: initialData?.expectedDate || "",
    results: initialData?.results || [],
    notes: initialData?.notes || "",
    selectedTemplate: initialData?.selectedTemplate || "",
  });

  const [availableTemplates, setAvailableTemplates] = useState([]);

  useEffect(() => {
    dispatch(fetchLabTemplates());
  }, [dispatch]);

  useEffect(() => {
    if (labTemplates.length > 0) {
      setAvailableTemplates(labTemplates);
    }
  }, [labTemplates]);

  const handleValueChange = (index, newValue) => {
    const updatedResults = [...formData.results];
    updatedResults[index].value = newValue;
    setFormData({ ...formData, results: updatedResults });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "testType") {
      const filteredTemplates = labTemplates.filter(
        (template) =>
          template.name.toLowerCase().includes(value.toLowerCase()) ||
          template.category.toLowerCase().includes(value.toLowerCase())
      );
      setAvailableTemplates(filteredTemplates);

      setFormData((prev) => ({
        ...prev,
        [name]: value,
        selectedTemplate: "",
        results: [],
      }));
    } else if (name === "selectedTemplate") {
      const template = labTemplates.find((t) => t.id === value);
      if (template) {
        const templateResults = template.parameters.map((param) => ({
          name: param.name,
          unit: param.unit,
          normalRange: param.normalRange,
          value: "",
        }));

        setFormData((prev) => ({
          ...prev,
          [name]: value,
          results: templateResults,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isUpdate) {
        await dispatch(updateLabTest({ id: initialData.id, ...formData })).unwrap();
      }
    } catch (error) {
      console.error("Error updating lab test:", error);
    }
  };

  return {
    formData,
    availableTemplates,
    handleChange,
    handleValueChange,
    handleSubmit,
  };
};