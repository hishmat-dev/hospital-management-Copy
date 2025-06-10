const TemplateSelection = ({ formData, availableTemplates, handleChange }) => {
  return (
    <>
      {formData.testType && availableTemplates.length > 0 && (
        <div>
          <label className="block font-medium text-gray-700 mb-2">Test Type *</label>
          <select
            name="selectedTemplate"
            value={formData.selectedTemplate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select a template or enter manually</option>
            {availableTemplates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.name} ({template.category})
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );
};

export default TemplateSelection;