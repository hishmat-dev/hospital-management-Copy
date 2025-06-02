import { useAssignBed } from "./create.hook";
import { AssignForm } from "./Form";

const AssignBed = () => {
  const { beds, formData, errors, loading, handleChange, handleSubmit, handleCancel } = useAssignBed();

  // Define room type options (can be from config or backend)
  const roomTypeOptions = ["Single", "Double", "Suite", "Deluxe"];

  return (
    <div className="mt-8 text-[12px]">
      <h2 className=" font-bold mb-4">Assign Bed to Patient</h2>
      <AssignForm
        roomOptions={beds} // available beds from your hook
        roomTypeOptions={roomTypeOptions}
        formData={formData}
        errors={errors}
        loading={loading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default AssignBed;