
import SectionPersonal from "./components/SectionPersonal"
import SectionContact from "./components/SectionContact"
import SectionMedical from "./components/SectionMedical"
import ActionButtons from "./components/Btn"
import { useUpdateHooks } from "./update.hooks"

export default function PatientUpdateForm({ patientId }) {
  const { formData, errors, loading, handleInputChange, handleSubmit } = useUpdateHooks(patientId)

  return (
    <div className="space-y-6">
      <SectionPersonal formData={formData} handleInputChange={handleInputChange} errors={errors} />

      <SectionContact formData={formData} handleInputChange={handleInputChange} errors={errors} />

      <SectionMedical formData={formData} handleInputChange={handleInputChange} errors={errors} />

      <ActionButtons onSubmit={handleSubmit} loading={loading} patientId={patientId} />
    </div>
  )
}
