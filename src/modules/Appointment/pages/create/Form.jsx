
import SectionPatient from "./components/SectionPatient"
import SectionDoctor from "./components/SectionDoctor"
import SectionSchedule from "./components/SectionSchedule"
import Btn from "./components/Btn"
import { useAppointmentCreate } from "./create.hooks"

export default function AppointmentCreateForm() {
  const { formData, errors, loading, patients, doctors, timeSlots, handleChange, handleSubmit, handleCancel, isValid } =
    useAppointmentCreate()

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Book New Appointment</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <SectionPatient formData={formData} handleChange={handleChange} errors={errors} patients={patients} />

          <SectionDoctor formData={formData} handleChange={handleChange} errors={errors} doctors={doctors} />

          <SectionSchedule formData={formData} handleChange={handleChange} errors={errors} timeSlots={timeSlots} />

          <Btn onSave={handleSubmit} onCancel={handleCancel} loading={loading} disabled={!isValid} />
        </form>
      </div>
    </div>
  )
}
