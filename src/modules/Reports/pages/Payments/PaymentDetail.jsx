import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchPaymentById } from "../../action/slice"
import { ArrowLeft, Printer, Download, User, Phone, Mail, MapPin, Calendar, CreditCard } from "lucide-react"
import LoadingComponent from "../../../../components/ui/LoadingComponent"

export default function PaymentDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { selectedPayment, loading } = useSelector((state) => state.reports)

  useEffect(() => {
    dispatch(fetchPaymentById(id))
  }, [dispatch, id])

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    // In a real app, this would generate a PDF
    alert("Download functionality would be implemented here")
  }

  if (loading) {
    return (
      <LoadingComponent/>
    )
  }

  if (!selectedPayment) {
    return (
      <div className="text-center py-12">
        <h3 className=" font-medium text-gray-900 mb-2">Payment record not found</h3>
        <button
          onClick={() => navigate("/reports/payments")}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Payments
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6 text-[12px]" id="payment-receipt text-[12px]">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/reports/payment")}
              className="text-gray-600 hover:text-gray-800 print:hidden"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className=" font-bold text-gray-900">Payment Receipt</h1>
          </div>

          <div className="flex items-center gap-3 print:hidden">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-3 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              <Printer size={16} />
              Print
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-3 py-2 bg-primary-color text-white rounded-md  transition-colors"
            >
              <Download size={16} />
              Download
            </button>
          </div>
        </div>

        {/* Receipt Header */}
        <div className="border-b pb-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="font-bold text-gray-900">{selectedPayment.invoiceNo}</h2>
              <p className="text-gray-600">
                <span
                  className={`inline-block px-2 py-1 rounded-sm  ${
                    selectedPayment.status === "Paid"
                      ? "bg-green-100 text-green-800"
                      : selectedPayment.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {selectedPayment.status}
                </span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-600">Payment Date</p>
              <p className="font-medium">{selectedPayment.paidDate}</p>
            </div>
          </div>
        </div>

        {/* Patient and Payment Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Patient Information */}
          <div>
            <h3 className=" font-semibold text-gray-900 mb-4">Patient Information</h3>
            <div className="space-y-3">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <User size={16} className="text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium">{selectedPayment.patientName}</p>
                    <p className="text-gray-600 ">Patient ID: {selectedPayment.patientId}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={16} className="text-gray-400 mt-0.5" />
                  <p>{selectedPayment.phone}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Mail size={16} className="text-gray-400 mt-0.5" />
                  <p>{selectedPayment.email}</p>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-gray-400 mt-0.5" />
                  <p>{selectedPayment.address}</p>
                </div>
              </div>
            </div>



            </div>
          </div>

          {/* Payment Information */}
          <div>
            <h3 className=" font-semibold text-gray-900 mb-4">Payment Information</h3>
            <div className="space-y-3">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CreditCard size={16} className="text-gray-400 mt-0.5" />
                    <div>
                      <p className="font-medium">Payment Method</p>
                      <p>{selectedPayment.paymentType}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar size={16} className="text-gray-400 mt-0.5" />
                    <div>
                      <p className="font-medium">Department</p>
                      <p>{selectedPayment.department}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-start gap-3">
                    <User size={16} className="text-gray-400 mt-0.5" />
                    <div>
                      <p className="font-medium">Doctor</p>
                      <p>{selectedPayment.doctor}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Items */}
        <div className="mb-8">
          <h3 className=" font-semibold text-gray-900 mb-4">Payment Details</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left  font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-right  font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {selectedPayment.items.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap  text-gray-900">{item.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap  text-gray-900 text-right">{item.amount}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap  font-medium text-gray-900 text-right">
                    Total Amount
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap  font-bold text-gray-900 text-right">
                    {selectedPayment.paidAmount}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Notes and Terms */}
        <div className="border-t pt-6">
          <div className=" text-gray-600">
            <p className="mb-2">
              <strong>Note:</strong> This is an electronic receipt and is valid without a signature.
            </p>
            <p>For any queries regarding this payment, please contact our accounts department.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
