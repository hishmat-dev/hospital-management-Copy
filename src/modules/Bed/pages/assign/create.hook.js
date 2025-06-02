import { useState, useCallback } from "react";

export const useAssignBed = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    chiefComplaint: "",
    gender: "",
    age: "",
    roomType: "",
    roomNo: "",
    admissionDate: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Sample bed data (replace with API call in a real app)
  const beds = [
    { id: 1, number: "101" },
    { id: 2, number: "102" },
    { id: 3, number: "103" },
  ];

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Basic validation
    if (value.trim() === "" && ["name", "roomType", "roomNo", "admissionDate"].includes(name)) {
      setErrors((prev) => ({
        ...prev,
        [name]: `${name.replace(/([A-Z])/g, " $1").trim()} is required`,
      }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        console.log("Bed assigned:", formData);
        setLoading(false);
      }, 1000);
    },
    [formData]
  );

  const handleCancel = useCallback(() => {
    setFormData({
      name: "",
      phone: "",
      chiefComplaint: "",
      gender: "",
      age: "",
      roomType: "",
      roomNo: "",
      admissionDate: "",
    });
    setErrors({});
  }, []);

  return { beds, formData, errors, loading, handleChange, handleSubmit, handleCancel };
};