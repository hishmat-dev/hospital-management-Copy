import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatientById } from "../../action/slice";

export const useDetailHooks = (patientId) => {
  const dispatch = useDispatch();
  const { patients, selectedPatient, loading, error } = useSelector((state) => state.patients);

  useEffect(() => {
    if (!patientId) return;

    const existing = patients.find((p) => p.id === patientId);
    if (existing && selectedPatient?.id === patientId) return; // No need to refetch

    dispatch(fetchPatientById(patientId));
  }, [patientId, dispatch, patients, selectedPatient]);

  const patient = selectedPatient?.id === patientId
    ? selectedPatient
    : patients.find((p) => p.id === patientId) || null;

  return {
    patient,
    loading,
    error,
  };
};
