import { useSearchParams } from "react-router-dom";
import SectionPatient from "./components/SectionPatient";
import SectionTest from "./components/SectionTest";
import Btn from "./components/Btn";
import { useLaboratoryCreate } from "./create.hooks";
import { fetchPatientById } from "../../../Patient/action/slice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useMemo, useCallback } from "react";
import LoadingComponent from "../../../../components/ui/LoadingComponent";

export default function LaboratoryCreateForm() {
  const [searchParams] = useSearchParams();
  const patientId = searchParams.get("patientId");
  const dispatch = useDispatch();

  // Fetch patient data from Redux store
  const patient = useSelector((state) => state.patient?.patientData);
  const patientLoading = useSelector((state) => state.patient?.loading);
  const patients = useSelector((state) => state.patients?.patients || []);

  const {
    formData,
    errors,
    loading,
    doctors,
    testCategories,
    handleChange,
    handleSubmit: submitForm,
    handleCancel,
    isValid,
  } = useLaboratoryCreate();

  // State for managing multiple tests and test form visibility
  const [tests, setTests] = useState([]);
  const [showTestForm, setShowTestForm] = useState(false);

  // Memoize matchedPatient to prevent unnecessary recomputation
  const matchedPatient = useMemo(() => {
    if (!patientId) return null;
    return patients.find((p) => p.id === patientId) || patient;
  }, [patientId, patients, patient]);

  // Fetch patient data when patientId exists
  useEffect(() => {
    if (patientId) {
      dispatch(fetchPatientById(patientId));
    }
  }, [patientId, dispatch]);

  // Pre-populate formData with matched patient data only if different
  useEffect(() => {
    if (!matchedPatient) return;

    const hasChanges =
      formData.patientId !== matchedPatient.id ||
      formData.patientName !== matchedPatient.name ||
      formData.patientAge !== matchedPatient.age ||
      formData.patientGender !== matchedPatient.gender ||
      formData.department !== matchedPatient.department;

    if (hasChanges) {
      // Batch updates in a single setFormData call
      handleChange({
        target: {
          name: "batchUpdate",
          value: {
            patientId: matchedPatient.id,
            patientName: matchedPatient.name,
            patientAge: matchedPatient.age,
            patientGender: matchedPatient.gender,
            department: matchedPatient.department,
          },
        },
      });
    }
  }, [matchedPatient, formData, handleChange]);

  // Handle adding a test
  const handleAddTest = useCallback((testData) => {
    if (testData) {
      setTests((prev) => [...prev, testData]);
    }
    setShowTestForm(false);
  }, []);

  // Handle form submission with all tests
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      submitForm(e, tests);
      // console.log("adding tests with form:", submitForm, "and tests:", tests);
    },
    [submitForm, tests]
  );

  return (
    <div className="space-y-3 text-[12px]">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="font-bold text-gray-900 mb-6">Order New Lab Test</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {patientLoading && patientId ? (
            <LoadingComponent />
          ) : (
            <SectionPatient
              formData={formData}
              handleChange={handleChange}
              errors={errors}
              patients={patients}
              doctors={doctors}
              matchedPatient={matchedPatient}
            />
          )}

          {/* Button to show test form */}
          {!showTestForm && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowTestForm(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <span className="mr-2">+</span> Add Test
              </button>
            </div>
          )}

          {/* Test form */}
          {showTestForm && (
            <SectionTest
              doctors={doctors}
              testCategories={testCategories}
              onAddTest={handleAddTest}
            />
          )}

          {/* Display added tests in a table */}
          {tests.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Added Tests</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 text-left text-gray-600">Test Category</th>
                      <th className="px-4 py-2 text-left text-gray-600">Specific Test</th>
                      <th className="px-4 py-2 text-left text-gray-600">Custom Test Name</th>
                      <th className="px-4 py-2 text-left text-gray-600">Priority</th>
                      <th className="px-4 py-2 text-left text-gray-600">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tests.map((test, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-2">{test.testCategory}</td>
                        <td className="px-4 py-2">{test.testType}</td>
                        <td className="px-4 py-2">{test.customTestName || '-'}</td>
                        <td className="px-4 py-2">{test.priority}</td>
                        <td className="px-4 py-2">
                          <button
                            onClick={() => setTests(tests.filter((_, i) => i !== index))}
                            className="text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <Btn onSave={handleSubmit} onCancel={handleCancel} loading={loading} disabled={!isValid || tests.length === 0} />
        </form>
      </div>
    </div>
  );
}