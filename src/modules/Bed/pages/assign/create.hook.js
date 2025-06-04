import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { assignBed } from "../../action/slice";
import { useNavigate } from "react-router-dom";

export const useAssignBed = (bed) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const beds = useSelector((state) => state.beds.beds); // Fetch beds from Redux store
  const [formData, setFormData] = useState({
    patientName: "",
    patientId: "",
    phone: "",
    chiefComplaint: "",
    gender: "",
    age: "",
    roomNumber: bed?.roomNumber || "", // Pre-populate roomNumber
    bedNumber: bed?.bedNumber || "",   // Pre-populate bedNumber
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
      roomNumber: bed?.roomNumber || "", // Keep roomNumber on reset
      bedNumber: bed?.bedNumber || "",   // Keep bedNumber on reset
      admissionDate: "",
    });
    setErrors({});
  }, [bed]);

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
            resetForm();
            navigate("/beds/list"); // Navigate after successful submission
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
    [formData, dispatch, errors, beds, resetForm, navigate]
  );

  const handleCancel = useCallback(() => {
    resetForm();
    navigate("/beds/list");
  }, [resetForm, navigate]);

  return { formData, errors, loading, handleChange, handleSubmit, handleCancel };
};