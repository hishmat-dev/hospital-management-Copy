import React from "react";

const ReportForm = ({ visit, index, handleVisitChange, handleMedicineChange }) => {
  return (
    <div className="p-4 border rounded-md mb-4 text-[12px]">
      <h4 className=" font-semibold text-gray-700 mb-2">Visit </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        <div>
          <label className="block  font-medium text-gray-700">Doctor</label>
          <input
            type="text"
            name="consultingDoctor"
            value={visit.consultingDoctor || ""}
            onChange={(e) => handleVisitChange(index, e)}
            className="mt-1 p-2 border w-full border-gray-300 rounded-md shadow-sm"
            placeholder="Enter doctor name"
          />
        </div>
        <div>
          <label className="block  font-medium text-gray-700">Visit Date</label>
          <input
            type="date"
            name="visitDate"
            value={visit.visitDate || ""}
            onChange={(e) => handleVisitChange(index, e)}
            className="mt-1 p-2 border w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block  font-medium text-gray-700">Department</label>
          <input
            type="text"
            name="department"
            value={visit.department || ""}
            onChange={(e) => handleVisitChange(index, e)}
            className="mt-1 p-2 border w-full border-gray-300 rounded-md shadow-sm"
            placeholder="Enter department"
          />
        </div>
        
       
      </div>
      <div className="mt-4">
        <label className="block  font-medium text-gray-700">Prescription</label>
        <input
          type="text"
          name="prescription"
          value={visit.prescription || ""}
          onChange={(e) => handleVisitChange(index, e)}
          className="mt-1 p-2 border block w-full border-gray-300 rounded-md shadow-sm"
          placeholder="Enter prescription"
        />
      </div>
      
      <div className="mt-4">
        <label className="block  font-medium text-gray-700">Medicines</label>
        {visit.medicines.map((med, medIndex) => (
          <div key={medIndex} className="flex gap-2 mt-2">
            <input
              type="text"
              value={med.name || ""}
              onChange={(e) => handleMedicineChange(index, medIndex, e)}
              className="block p-2 border w-1/3 border-gray-300 rounded-md shadow-sm"
              placeholder="Medicine name"
            />
            <input
              type="number"
              name="morning"
              value={med.schedule?.morning || ""}
              onChange={(e) => handleMedicineChange(index, medIndex, e, "schedule")}
              className="block p-2 border w-1/3 border-gray-300 rounded-md shadow-sm"
              placeholder="Morning"
            />
            <input
              type="number"
              name="afternoon"
              value={med.schedule?.afternoon || ""}
              onChange={(e) => handleMedicineChange(index, medIndex, e, "schedule")}
              className="block p-2 border w-1/3 border-gray-300 rounded-md shadow-sm"
              placeholder="Afternoon"
            />
            <input
              type="number"
              name="night"
              value={med.schedule?.night || ""}
              onChange={(e) => handleMedicineChange(index, medIndex, e, "schedule")}
              className="block p-2 border w-1/3 border-gray-300 rounded-md shadow-sm"
              placeholder="Night"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleMedicineChange(index, visit.medicines.length, null, "add")}
          className="mt-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Medicine
        </button>
      </div>
    </div>
  );
};

export default ReportForm;