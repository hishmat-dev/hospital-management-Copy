import { useParams, useNavigate } from "react-router-dom";
import SectionPatient from "./Components/SectionPatient";
import Btn from "./Components/Btn";
import { useReportCreate } from "./createReport.hooks";
import ReportForm from './Components/ReportForm';

export default function ReportCreateForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { formData, errors, loading, handleChange, handleVisitChange, handleMedicineChange, handleSubmit, handleCancel, isValid } = useReportCreate();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-[12px] font-bold text-gray-900 mb-3">Add New Report</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                <SectionPatient formData={formData} handleChange={handleChange} errors={errors} />
                {/* <SectionDoctor formData={formData} handleChange={handleChange} errors={errors} /> */}
            </div>
          {formData.visits.map((visit, index) => (
            <ReportForm
              key={index}
              visit={visit}
              index={index}
              handleVisitChange={handleVisitChange}
              handleMedicineChange={handleMedicineChange}
            />
          ))}
          {/* <button
            type="button"
            onClick={addVisit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Another Visit
          </button> */}
          <Btn onSave={handleSubmit} onCancel={handleCancel} loading={loading} disabled={!isValid} />
        </form>
      </div>
    </div>
  );
}