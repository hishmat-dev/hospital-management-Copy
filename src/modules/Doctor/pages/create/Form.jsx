
import SectionPersonal from "./components/SectionPersonal"
import SectionProfessional from "./components/SectionProfessional"
import SectionContact from "./components/SectionContact"
import Btn from "./components/Btn"
import { useDoctorCreate } from "./create.hooks"

export default function DoctorCreateForm() {
  const { formData, errors, loading, handleChange, handleSubmit, handleCancel, isValid } = useDoctorCreate()

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-[12px] font-bold text-gray-900 mb-3">Add New Doctor</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <SectionPersonal formData={formData} handleChange={handleChange} errors={errors} />

          <SectionProfessional formData={formData} handleChange={handleChange} errors={errors} />

          <SectionContact formData={formData} handleChange={handleChange} errors={errors} />

          <Btn onSave={handleSubmit} onCancel={handleCancel} loading={loading} disabled={!isValid} />
        </form>
      </div>
    </div>
  )
}
