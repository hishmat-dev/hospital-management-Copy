import InfoItem from "./InfoItem";
import Section from "./Section";
import { listingHelper } from "../../listing/listing.helper";
import { detailHelper } from "./detail.helper";
import logo from "../../../../../shared/workwise.svg"

const LabTestDetail = ({ test, labInfo = { name: "Workw Labs", accreditation: "CLIA Certified" } }) => {
  // console.log("test", test);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 text-[12px]">
      {/* Header */}
      <div className="border-b pb-4 mb-6">
        <div className="flex flex-row items-center justify-between">
          <div className="flex-shrink-0">
            <img
              src={labInfo.logoUrl || logo}
              alt="Lab Logo"
              className="h-24 w-auto"
              aria-label="Lab Logo"
            />
          </div>
          <div className="flex-1 text-center">
            <h2 className="font-bold text-xl text-gray-900">Lab Test Report</h2>
            <p className="text-gray-600">{labInfo.name}</p>
            <p className="text-gray-600">Accreditation: {labInfo.accreditation}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <Section title="Patient Information">
          <InfoItem label="Patient" value={test.patientName} />
          <InfoItem label="Patient ID" value={test.patientId} />
          <InfoItem label="Age" value={test.patientAge} />
          <InfoItem label="Gender" value={test.patientGender} />
        </Section>

        <Section title="Test Information">
          <InfoItem label="Test Name" value={test.testName} />
          <InfoItem label="Test Type" value={test.testType} />
          <InfoItem label="Category" value={test.category} />
          <InfoItem label="Test Code" value={test.testCode} />
          <InfoItem
            label="Priority"
            value={
              <span
                className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${listingHelper.getPriorityColor(
                  test.priority
                )}`}
              >
                {test.priority}
              </span>
            }
          />
          <InfoItem
            label="Status"
            value={
              <span
                className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${listingHelper.getStatusColor(
                  test.status
                )}`}
              >
                {test.status}
              </span>
            }
          />
          <InfoItem label="Cost" value={test.cost} />
        </Section>

        <Section title="Dates & Times">
          <InfoItem label="Ordered Date" value={test.orderedDate} />
          <InfoItem label="Sample Date" value={test.sampleDate || "N/A"} />
          <InfoItem label="Expected Date" value={test.expectedDate || "N/A"} />
          <InfoItem label="Report Date" value={test.reportDate || "N/A"} />
        </Section>

        <Section title="Doctor Information">
          <InfoItem label="Ordering Doctor" value={test.doctorName} />
          <InfoItem label="Technician" value={test.technician} />
        </Section>
      </div>

      {test.results?.length > 0 && (
        <div className="mt-6">
          <Section title="Test Results">
            <div className="overflow-auto rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50 text-gray-700 font-semibold">
                  <tr>
                    <th className="px-4 py-2 text-left">Parameter</th>
                    <th className="px-4 py-2 text-left">Result</th>
                    <th className="px-4 py-2 text-left">Unit</th>
                    <th className="px-4 py-2 text-left">Reference Range</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Comments</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white text-gray-800">
                  {test.results.map((result, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2">{result.name}</td>
                      <td
                        className={`px-4 py-2 ${result.abnormalFlag !== "normal" ? "text-red-600 font-medium" : ""
                          }`}
                      >
                        {result.value}
                      </td>
                      <td className="px-4 py-2">{result.unit || "N/A"}</td>
                      <td className="px-4 py-2">
                        {result.referenceRange || <span className="italic text-gray-400">N/A</span>}
                      </td>
                      <td className="px-4 py-2 capitalize">{result.abnormalFlag}</td>
                      <td className="px-4 py-2">{result.resultComments || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        </div>
      )}

      {test.notes && (
        <div className="mt-10">
          <Section title="Notes">
            <div className="bg-gray-100 text-gray-800 p-4 rounded-md border">
              <p>{test.notes}</p>
            </div>
          </Section>
        </div>
      )}

      <div className="mt-8 text-center text-gray-600">
        <p>Generated on: {new Date().toLocaleString("en-PK", { timeZone: "Asia/Karachi" }).replace(/,/g, "")}</p>
        <p>Test ID: {test.id}</p>
      </div>

      {test.status !== "Pending" && (
        <div className="flex justify-end mb-4">
          <button
            onClick={() => detailHelper.downloadPDF(test, labInfo)}
            className="bg-red-600 text-white px-4 py-2 rounded-md transition"
            aria-label="Download lab report as PDF"
          >
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default LabTestDetail;