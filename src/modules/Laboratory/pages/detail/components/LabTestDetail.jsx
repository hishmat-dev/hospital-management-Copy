// components/LabTestDetail/LabTestDetail.jsx
import InfoItem from "./InfoItem"
import Section from "./Section"
import { listingHelper } from "../../listing/listing.helper"

const LabTestDetail = ({ test }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="border-b pb-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Lab Test Details</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Section title="Patient Information">
          <InfoItem label="Patient" value={test.patientName} />
          <InfoItem label="Patient ID" value={test.patientId} />
          <InfoItem label="Age" value={test.patientAge} />
          <InfoItem label="Gender" value={test.patientGender} />
        </Section>

        <Section title="Test Information">
          <InfoItem label="Test Type" value={test.testType} />
          <InfoItem label="Category" value={test.category} />
          <InfoItem
            label="Priority"
            value={
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${listingHelper.getPriorityColor(test.priority)}`}>
                {test.priority}
              </span>
            }
          />
          <InfoItem
            label="Status"
            value={
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${listingHelper.getStatusColor(test.status)}`}>
                {test.status}
              </span>
            }
          />
        </Section>

        <Section title="Dates & Times">
          <InfoItem label="Ordered Date" value={test.orderedDate} />
          <InfoItem label="Sample Date" value={test.sampleDate} />
          <InfoItem label="Expected Date" value={test.expectedDate} />
          {test.completedDate && <InfoItem label="Completed Date" value={test.completedDate} />}
        </Section>

        <Section title="Doctor Information">
          <InfoItem label="Ordering Doctor" value={test.doctorName} />
          <InfoItem label="Department" value={test.department} />
        </Section>
      </div>

      {test.results && (
        <div className="mt-10">
          <Section title="Test Results">
            <div className="bg-gray-100 text-sm text-gray-800 p-4 rounded-md border space-y-2">
              {Object.entries(test.results).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b pb-1">
                  <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </Section>
        </div>
      )}


      {test.notes && (
        <div className="mt-10">
          <Section title="Notes">
            <div className="bg-gray-100 text-sm text-gray-800 p-4 rounded-md border">
              <p>{test.notes}</p>
            </div>
          </Section>
        </div>
      )}
    </div>
  )
}

export default LabTestDetail
