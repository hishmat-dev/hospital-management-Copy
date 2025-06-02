import SectionPatientInfo from "./components/SectionPatientInfo";
import SectionRoomInfo from "./components/SectionRoomInfo";
import Btn from "./components/Btn";

export const AssignForm = ({
  formData,
  errors,
  handleChange,
  handleSubmit,
  handleCancel,
  loading,
  roomOptions,
  roomTypeOptions,
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
          <SectionRoomInfo
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            roomOptions={roomOptions}
            roomTypeOptions={roomTypeOptions}
          />
          <Btn onSave={handleSubmit} onCancel={handleCancel} loading={loading} />
        </form>
      </div>
    </div>
  );
};