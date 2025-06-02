import SectionPatientInfo from "./components/SectionPatientInfo";
import SectionBedInfo from "./components/SectionBedInfo";
import Btn from "./components/Btn";

export const AssignForm = ({
  formData,
  errors,
  handleChange,
  handleSubmit,
  handleCancel,
  loading,
  roomOptions,
}) => {
  return (
    <div className="space-y-3">
      <div className="bg-white rounded-lg shadow-md p-3">
        <form onSubmit={handleSubmit} className="space-y-4">
          <SectionPatientInfo
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />
          <SectionBedInfo
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            roomOptions={roomOptions}
          />
          <Btn onSave={handleSubmit} onCancel={handleCancel} loading={loading} />
        </form>
      </div>
    </div>
  );
};