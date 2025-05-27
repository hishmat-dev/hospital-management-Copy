
import SectionPersonal from "./components/SectionPersonal"
import SectionProfessional from "./components/SectionProfessional"
import SectionContact from "./components/SectionContact"
import ActionButtons from "./components/Btn"
import { useUpdateHooks } from "./update.hooks"

export default function DoctorUpdateForm({ doctorId }) {
  const { formData, errors, loading, handleInputChange, handleSubmit } = useUpdateHooks(doctorId)

  return (
    <div className="space-y-6">
      <SectionPersonal formData={formData} handleInputChange={handleInputChange} errors={errors} />

      <SectionProfessional formData={formData} handleInputChange={handleInputChange} errors={errors} />

      <SectionContact formData={formData} handleInputChange={handleInputChange} errors={errors} />

      <ActionButtons onSubmit={handleSubmit} loading={loading} doctorId={doctorId} />
    </div>
  )
}
