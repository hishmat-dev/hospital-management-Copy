// create.hooks.js
import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createLabTest } from "../../action/slice";
import { validateLabTestForm, validateField } from "./create.validation";
import { createConfig } from "./create.config";

export const useLaboratoryCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { patients } = useSelector((state) => state.patients);
  const { doctors } = useSelector((state) => state.doctors);

  const [formData, setFormData] = useState({
    ...createConfig.initialFormData,
    customTestName: "",
    clinicalInfo: "",
    expectedDuration: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      // Real-time validation
      const fieldError = validateField(name, value, formData);
      setErrors((prev) => ({
        ...prev,
        [name]: fieldError,
      }));
    },
    [formData]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // Validate patientName by checking if it matches a valid patient
      const selectedPatient = patients.find((p) => p.name === formData.patientName);
      if (!selectedPatient) {
        setErrors((prev) => ({
          ...prev,
          patientName: "Please select a valid patient from the suggestions",
        }));
        return;
      }

      // Validate orderingDoctor
      const selectedDoctor = doctors.find((d) => d.name === formData.orderingDoctor);
      if (!selectedDoctor) {
        setErrors((prev) => ({
          ...prev,
          orderingDoctor: "Please select a valid doctor from the suggestions",
        }));
        return;
      }

      const updatedFormData = {
        ...formData,
        patientId: selectedPatient.id, // Ensure patientId is set
      };

      const { errors: validationErrors, isValid } = validateLabTestForm(updatedFormData);
      setErrors(validationErrors);

      if (!isValid) return;

      setLoading(true);
      try {
        const labTestData = {
          ...updatedFormData,
          id: `L-${Date.now()}`,
          status: "Pending",
          results: null,
          reportDate: null,
          technician: null,
          createdAt: new Date().toISOString(),
        };

        await dispatch(createLabTest(labTestData)).unwrap();
        navigate("/laboratory/list");
      } catch (error) {
        console.error("Error creating lab test:", error);
      } finally {
        setLoading(false);
      }
    },
    [formData, dispatch, navigate, patients, doctors]
  );

  const handleCancel = useCallback(() => {
    navigate("/laboratory/list");
  }, [navigate]);

  const { isValid } = validateLabTestForm(formData);

  return {
    formData,
    errors,
    loading,
    patients,
    doctors,
    testCategories: createConfig.testCategories,
    handleChange,
    handleSubmit,
    handleCancel,
    isValid,
  };
};