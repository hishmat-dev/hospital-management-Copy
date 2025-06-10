import ReusableTable from "../../../../../components/ui/SharedTable";

const TestResultsSection = ({ formData, headers, handleValueChange }) => {
  return (
    <div>
      <label className="block font-medium text-gray-700 mb-2">Test Results</label>
      {formData.selectedTemplate ? (
        <div className="space-y-4">
          <div className="bg-blue-50 p-2 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">
              Test: {formData.selectedTemplate}
            </h4>
            <p className="text-gray-800 mb-1">
              Fill in the observed values for each parameter. Normal ranges are provided for reference.
            </p>
          </div>
          <ReusableTable
            headers={headers}
            data={formData.results.map((item, index) => ({ ...item, id: index }))}
            renderCell={(key, item) => {
              if (key === "value") {
                return (
                  <input
                    type="text"
                    value={item.value}
                    onChange={(e) => handleValueChange(item.id, e.target.value)}
                    className="w-full px-2 py-1 border border-gray-400 rounded focus:outline-none"
                    placeholder="Enter value"
                  />
                );
              }
              return null;
            }}
          />
        </div>
      ) : (
        <p className="text-red-400">Select Template</p>
      )}
    </div>
  );
};

export default TestResultsSection;