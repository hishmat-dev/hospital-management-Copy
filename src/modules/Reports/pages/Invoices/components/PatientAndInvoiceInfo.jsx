import { User, Phone, Mail, MapPin, CreditCard, FileText } from "lucide-react"

export default function PatientAndInvoiceInfo({ invoice }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Patient Information */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Information</h3>
        <div className="space-y-3">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <User size={16} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium">{invoice.patientName || "N/A"}</p>
                  <p className="text-gray-600 text-xs">Patient ID: {invoice.patientId || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={16} className="text-gray-400 mt-0.5" />
                <p>{invoice.phone || "N/A"}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail size={16} className="text-gray-400 mt-0.5" />
                <p>{invoice.email || "N/A"}</p>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-gray-400 mt-0.5" />
                <p>{invoice.address || "N/A"}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Invoice Information */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Information</h3>
        <div className="space-y-3">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CreditCard size={16} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium">Payment Method</p>
                  <p>{invoice.paymentType || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText size={16} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium">Department</p>
                  <p>{invoice.department || "N/A"}</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <FileText size={16} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium">Category</p>
                  <p>{invoice.category || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <User size={16} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium">Doctor</p>
                  <p>{invoice.doctor || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}