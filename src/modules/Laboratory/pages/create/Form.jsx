
import SectionPatient from "./components/SectionPatient"
import SectionTest from "./components/SectionTest"
import Btn from "./components/Btn"
import { useLaboratoryCreate } from "./create.hooks"

export default function LaboratoryCreateForm() {
  const {
    formData,
    errors,
    loading,
    patients,
    doctors,
    testCategories,
    handleChange,
    handleSubmit,
    handleCancel,
    isValid,
  } = useLaboratoryCreate()

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Order New Lab Test</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <SectionPatient formData={formData} handleChange={handleChange} errors={errors} patients={patients} />

          <SectionTest
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            doctors={doctors}
            testCategories={testCategories}
          />

          <Btn onSave={handleSubmit} onCancel={handleCancel} loading={loading} disabled={!isValid} />
        </form>
      </div>
    </div>
  )
}
