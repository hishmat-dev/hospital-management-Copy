
import SectionBasic from "./components/SectionBasic"
import SectionFeatures from "./components/SectionFeatures"
import Btn from "./components/Btn"
import { useBedCreate } from "./create.hooks"

export default function BedCreateForm() {
  const { formData, errors, loading, handleChange, handleSubmit, handleCancel, isValid } = useBedCreate()

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Bed</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <SectionBasic formData={formData} handleChange={handleChange} errors={errors} />

          <SectionFeatures formData={formData} handleChange={handleChange} errors={errors} />

          <Btn onSave={handleSubmit} onCancel={handleCancel} loading={loading} disabled={!isValid} />
        </form>
      </div>
    </div>
  )
}
