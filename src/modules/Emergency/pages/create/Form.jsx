
import SectionPatient from "./components/SectionPatient"
import SectionMedical from "./components/SectionMedical"
import SectionVitals from "./components/SectionVitals"
import Btn from "./components/Btn"
import { useEmergencyCreate } from "./create.hooks"

export default function EmergencyCreateForm() {
  const { formData, errors, loading, handleChange, handleSubmit, handleCancel, isValid } = useEmergencyCreate()

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-red-100 p-2 rounded-lg">
            <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">!</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Emergency Registration</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <SectionPatient formData={formData} handleChange={handleChange} errors={errors} />

          <SectionMedical formData={formData} handleChange={handleChange} errors={errors} />

          <SectionVitals formData={formData} handleChange={handleChange} errors={errors} />

          <Btn onSave={handleSubmit} onCancel={handleCancel} loading={loading} disabled={!isValid} />
        </form>
      </div>
    </div>
  )
}
