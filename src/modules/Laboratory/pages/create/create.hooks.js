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
    patientId: "",
    patientName: "",
    patientAge: "",
    patientGender: "",
    department: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      if (name === "batchUpdate") {
        setFormData((prev) => ({
          ...prev,
          ...value,
        }));
        // Validate all fields in batch update
        Object.entries(value).forEach(([fieldName, fieldValue]) => {
          const fieldError = validateField(fieldName, fieldValue, { ...formData, ...value });
          setErrors((prev) => ({
            ...prev,
            [fieldName]: fieldError,
          }));
        });
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));

        // Real-time validation for patient fields
        const fieldError = validateField(name, value, formData);
        setErrors((prev) => ({
          ...prev,
          [name]: fieldError,
        }));
      }
    },
    [formData]
  );

  const handleSubmit = useCallback(
    async (e, tests = []) => {
      e.preventDefault();
      console.log("Submitting form with data:", formData, "Tests:", tests);
      // Validate patientName
      const selectedPatient = patients.find((p) => p.name === formData.patientName);
      if (!selectedPatient) {
        setErrors((prev) => ({
          ...prev,
          patientName: "Please select a valid patient from the suggestions",
        }));
        return;
      }

      // Validate each test
      const testErrors = {};
      const validatedTests = tests.map((test, index) => {
        const selectedDoctor = doctors.find((d) => d.name === test.orderingDoctor);
        if (!selectedDoctor) {
          testErrors[`test_${index}_orderingDoctor`] = "Please select a valid doctor";
        }

        const { errors: testValidationErrors, isValid } = validateLabTestForm(test);
        if (!isValid) {
          Object.keys(testValidationErrors).forEach((key) => {
            testErrors[`test_${index}_${key}`] = testValidationErrors[key];
          });
        }

        return {
          ...test,
          id: `L-${Date.now() + index}`,
          status: "Pending",
          results: null,
          reportDate: null,
          technician: null,
          createdAt: new Date().toISOString(),
        };
      });

      if (Object.keys(testErrors).length > 0) {
        setErrors(testErrors);
        return;
      }

      console.log("Test data: ", formData)

      setLoading(true);
      try {
        // Create a lab test for each test in the tests array
        for (const test of validatedTests) {
          const labTestData = {
            ...test,
            patientId: selectedPatient.id,
            patientName: selectedPatient.name,
            patientAge: formData.patientAge,
            patientGender: formData.patientGender,
            department: formData.department,
          };
          await dispatch(createLabTest(labTestData)).unwrap();
        }
        console.log("Lab tests created successfully", formData);
        navigate("/laboratory/list");
      } catch (error) {
        console.error("Error creating lab tests:", error);
        setErrors({ submit: "Failed to create lab tests" });
      } finally {
        setLoading(false);
      }
    },
    [formData, dispatch, navigate, patients, doctors]
  );

  const handleCancel = useCallback(() => {
    navigate("/laboratory/list");
  }, [navigate]);

  // Validate patient fields
  const { isValid: isPatientValid } = validateLabTestForm({
    patientName: formData.patientName,
    patientId: formData.patientId,
  });

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
    isValid: isPatientValid && patients.length > 0,
  };
};