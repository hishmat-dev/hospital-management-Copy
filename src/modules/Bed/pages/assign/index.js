import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAssignBed } from "./create.hook";
import { AssignForm } from "./Form";
import { fetchBeds } from "../../action/slice"; 

const AssignBed = () => {
  const dispatch = useDispatch();
  const { beds } = useSelector((state) => state.beds);
  const {
    formData,
    errors,
    loading,
    handleChange,
    handleSubmit,
    handleCancel,
  } = useAssignBed();

  // Fetch beds when component mounts
  React.useEffect(() => {
    dispatch(fetchBeds());
  }, [dispatch]);

  return (
    <div className=" mt-8 text-[12px] ">
      <h2 className=" font-bold mb-4">Assign Bed to Patient</h2>
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