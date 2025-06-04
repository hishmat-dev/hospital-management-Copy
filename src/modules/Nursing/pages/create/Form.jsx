
import SectionVitals from "./components/SectionVitals"
import Btn from "./components/Btn"
import { useNursingCreate } from "./create.hooks"

export default function NursingCreateForm() {
  const { formData, errors, loading, patients, handleChange, handleSubmit, handleCancel, isValid } = useNursingCreate()

  return (
    <div className="space-y-3 text-[12px]">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-green-100 p-2 rounded-lg">
            <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white  font-bold">+</span>
            </div>
          </div>
          <h1 className=" font-bold text-gray-900">Record Vital Signs</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <SectionVitals formData={formData} handleChange={handleChange} errors={errors} patients={patients} />

          <Btn onSave={handleSubmit} onCancel={handleCancel} loading={loading} disabled={!isValid} />
        </form>
      </div>
    </div>
  )
}
