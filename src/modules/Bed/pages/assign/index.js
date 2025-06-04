import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAssignBed } from "./create.hook";
import { AssignForm } from "./Form";
import { fetchBeds } from "../../action/slice";

const AssignBed = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { beds } = useSelector((state) => state.beds);
  const bed = beds.find((b) => b.id === id);
  // console.log("assigned beds: ", bed);

  const {
    formData,
    errors,
    loading,
    handleChange,
    handleSubmit,
    handleCancel,
  } = useAssignBed(bed); // Pass the bed object to the hook

  // Fetch beds when component mounts
  useEffect(() => {
    dispatch(fetchBeds());
  }, [dispatch]);

  return (
    <div className="mt-4 text-[12px]">
      <h2 className="font-bold ml-4">Assign Bed to Patient</h2>
      <AssignForm
        roomOptions={beds} // available beds from Redux store
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