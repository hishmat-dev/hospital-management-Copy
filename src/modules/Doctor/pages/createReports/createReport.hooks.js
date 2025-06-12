import { useState } from "react";
import { useNavigate } from "react-router-dom"

export function useReportCreate() {
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patientName: "",
    patientId: "",
    doctorName: "",
    doctorId: "",
    visits: [
      {
        consultingDoctor: "",
        visitDate: "",
        department: "",
        feePaid: "",
        reportsLink: "",
        prescription: "",
        reports: { weight: "", bloodPressure: "", sugarBefore: "", sugarAfter: "" },
        medicines: [{ name: "", schedule: { morning: "", afternoon: "", night: "" } }],
      },
    ],
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVisitChange = (index, e, section = "") => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newVisits = [...prev.visits];
      if (section === "reports") {
        newVisits[index] = {
          ...newVisits[index],
          reports: { ...newVisits[index].reports, [name]: value },
        };
      } else {
        newVisits[index] = { ...newVisits[index], [name]: value };
      }
      return { ...prev, visits: newVisits };
    });
  };

  const handleMedicineChange = (visitIndex, medIndex, e, section = "") => {
    const { name, value } = e ? e.target : { name: "", value: "" };
    setFormData((prev) => {
      const newVisits = [...prev.visits];
      if (section === "add") {
        newVisits[visitIndex].medicines.push({ name: "", schedule: { morning: "", afternoon: "", night: "" } });
      } else {
        const newMedicines = [...newVisits[visitIndex].medicines];
        if (section === "schedule") {
          newMedicines[medIndex] = {
            ...newMedicines[medIndex],
            schedule: { ...newMedicines[medIndex].schedule, [name]: value },
          };
        } else {
          newMedicines[medIndex] = { ...newMedicines[medIndex], name: value };
        }
        newVisits[visitIndex].medicines = newMedicines;
      }
      return { ...prev, visits: newVisits };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid(formData)) {
      setLoading(true);
      alert("submited")
      console.log("Submitting report:", formData);
      setLoading(false);
    }
  };

  const handleCancel = (id) => {
    setFormData({
      patientName: "",
      patientId: "",
      doctorName: "",
      doctorId: "",
      visits: [
        {
          consultingDoctor: "",
          visitDate: "",
          department: "",
          feePaid: "",
          reportsLink: "",
          prescription: "",
          reports: { weight: "", bloodPressure: "", sugarBefore: "", sugarAfter: "" },
          medicines: [{ name: "", schedule: { morning: "", afternoon: "", night: "" } }],
        },
      ],
    });
    
    navigate(`/patients/detail/${id}`)
  };

  const isValid = (data) => {
    return data.patientName && data.patientId && data.doctorName && data.doctorId && data.visits.every((v) => v.consultingDoctor && v.visitDate);
  };

  const addVisit = () => {
    setFormData((prev) => ({
      ...prev,
      visits: [
        ...prev.visits,
        {
          consultingDoctor: "",
          visitDate: "",
          department: "",
          feePaid: "",
          reportsLink: "",
          prescription: "",
          reports: { weight: "", bloodPressure: "", sugarBefore: "", sugarAfter: "" },
          medicines: [{ name: "", schedule: { morning: "", afternoon: "", night: "" } }],
        },
      ],
    }));
  };

  return { formData, errors, loading, handleChange, handleVisitChange, handleMedicineChange, handleSubmit, handleCancel, isValid, addVisit };
}