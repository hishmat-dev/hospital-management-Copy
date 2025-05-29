
import SectionPersonal from "./components/SectionPersonal"
import SectionContact from "./components/SectionContact"
import Btn from "./components/Btn"
import { usePatientCreate } from "./create.hooks"

export default function PatientCreateForm() {
  const { formData, errors, loading, handleChange, handleSubmit, handleCancel, isValid } = usePatientCreate()

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Patient</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <SectionPersonal formData={formData} handleChange={handleChange} errors={errors} />

          <SectionContact formData={formData} handleChange={handleChange} errors={errors} />

          {/* <SectionMedical formData={formData} handleChange={handleChange} errors={errors} /> */}

          <Btn onSave={handleSubmit} onCancel={handleCancel} loading={loading} disabled={!isValid} />
        </form>
      </div>
    </div>
  )
}
