import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { assignBed } from "../../action/slice";

export const useAssignBed = () => {
  const dispatch = useDispatch();
  const beds = useSelector((state) => state.beds.beds); // Fetch beds from Redux store
  const [formData, setFormData] = useState({
    patientName: "",
    patientId: "",
    phone: "",
    chiefComplaint: "",
    gender: "",
    age: "",
    roomNumber: "",
    bedNumber: "",
    admissionDate: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Define resetForm function to handle form reset logic
  const resetForm = useCallback(() => {
    setFormData({
      patientName: "",
      patientId: "",
      phone: "",
      chiefComplaint: "",
      gender: "",
      age: "",
      roomNumber: "",
      bedNumber: "",
      admissionDate: "",
    });
    setErrors({});
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (value.trim() === "" && ["patientName", "roomNumber", "bedNumber", "admissionDate"].includes(name)) {
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
      const { patientName, patientId, roomNumber, bedNumber } = formData;
      const bedId = beds.find((bed) => bed.roomNumber === roomNumber && bed.bedNumber === bedNumber)?.id;
      if (bedId) {
        dispatch(assignBed({ bedId, patientId, patientName }))
          .unwrap()
          .then(() => {
            setLoading(false);
            resetForm(); // Use resetForm instead of handleCancel
          })
          .catch((err) => {
            setLoading(false);
            setErrors({ ...errors, submit: err.message || "Failed to assign bed" });
          });
      } else {
        setLoading(false);
        setErrors({ ...errors, submit: "Invalid room or bed number" });
      }
    },
    [formData, dispatch, errors, beds, resetForm] // Update dependencies
  );

  const handleCancel = useCallback(() => {
    resetForm(); // Reuse resetForm logic for cancellation
  }, [resetForm]);

  return { formData, errors, loading, handleChange, handleSubmit, handleCancel };
};