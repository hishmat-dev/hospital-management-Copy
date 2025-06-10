import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLabForm } from "./create.hook";
import { formConfig, headersConfig } from "./create.config";
import FormFields from "./ui/FormFields";
import TemplateSelection from "./ui/TemplateSelection";
import TestResultsSection from "./ui/TestResultsSection";
import Notes from "./ui/Notes";
import Buttons from "./ui/Buttons";

const LaboratoryUpdateForm = ({ initialData, isUpdate = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { formData, availableTemplates, handleChange, handleValueChange, handleSubmit } = useLabForm(initialData, isUpdate);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormFields formData={formData} handleChange={handleChange} formConfig={formConfig} />
      <TemplateSelection
        formData={formData}
        availableTemplates={availableTemplates}
        handleChange={handleChange}
      />
      <TestResultsSection
        formData={formData}
        headers={headersConfig}
        handleValueChange={handleValueChange}
      />
      <Notes formData={formData} handleChange={handleChange} />
      <Buttons isUpdate={isUpdate} navigate={navigate} />
    </form>
  );
};

export default LaboratoryUpdateForm;