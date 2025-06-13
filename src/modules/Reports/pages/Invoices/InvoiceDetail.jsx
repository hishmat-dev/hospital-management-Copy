import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchInvoiceById, sendInvoiceEmail, clearEmailStatus } from "../../action/slice"
import { ArrowLeft, Printer, Download, Mail, X } from "lucide-react"
import InvoiceHeader from "./components/InvoiceHeader"
import PatientAndInvoiceInfo from "./components/PatientAndInvoiceInfo"
import ServicesTable from "./components/ServicesTable"
import TotalAmount from "./components/TotalAmount"
import EmailModal from "./components/EmailModal"
import LoadingComponent from "../../../../components/ui/LoadingComponent"

export default function InvoiceDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { selectedInvoice, loading, emailStatus } = useSelector((state) => state.reports)
  
  // Email modal state
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)
  const [emailData, setEmailData] = useState({
    to: "",
    subject: "Your Invoice from Hospital Management System",
    message: "",
  })
  
  useEffect(() => {
    dispatch(fetchInvoiceById(id))
  }, [dispatch, id])
  
  useEffect(() => {
    if (selectedInvoice) {
      setEmailData({
        to: selectedInvoice.email || "",
        subject: `Invoice ${selectedInvoice.invoiceNo || ""} from Hospital Management System`,
        message: `Dear ${selectedInvoice.patientName || ""},\n\nPlease find attached your invoice ${selectedInvoice.invoiceNo || ""} for ${selectedInvoice.category || ""} services at our hospital.\n\nTotal Amount: ${selectedInvoice.paidAmount || "N/A"}\nStatus: ${selectedInvoice.status || ""}\n\nIf you have any questions, please don't hesitate to contact us.\n\nBest regards,\nHospital Management Team`,
      })
    }
  }, [selectedInvoice])
  
  useEffect(() => {
    if (emailStatus === "success") {
      setIsEmailModalOpen(false)
      
      // Clear the status after 3 seconds
      const timer = setTimeout(() => {
        dispatch(clearEmailStatus())
      }, 3000)
      
      return () => clearTimeout(timer)
    }
  }, [emailStatus, dispatch])
  
  const handlePrint = () => {
    window.print()
  }
  
  const handleDownload = () => {
    alert("Download functionality would be implemented here")
  }
  
  const handleSendEmail = () => {
    setIsEmailModalOpen(true)
  }
  
  const handleSendEmailSubmit = (e) => {
    e.preventDefault()
    if (selectedInvoice) {
      dispatch(sendInvoiceEmail({
        invoiceId: selectedInvoice.id,
        emailData,
      }))
    }
  }
  
  // Helper function to parse and format monetary values
  const formatMoney = (value) => {
    if (!value || typeof value !== "string") return "N/A"
    // Remove "Rs." and commas, then parse to float
    const num = parseFloat(value.replace(/Rs\.\s?/, "").replace(/,/g, ""))
    return isNaN(num) ? "N/A" : `Rs. ${num.toFixed(2)}`
  }
  
  // Calculate subtotal from items
  const calculateSubtotal = (items) => {
    if (!items || !Array.isArray(items)) return "N/A"
    const total = items.reduce((sum, item) => {
      const amount = item.amount
        ? parseFloat(item.amount.replace(/Rs\.\s?/, "").replace(/,/g, ""))
        : 0
      return sum + (isNaN(amount) ? 0 : amount)
    }, 0)
    return isNaN(total) ? "N/A" : `Rs. ${total.toFixed(2)}`
  }
  
  if (loading) {
    return (
      <LoadingComponent/>
    )
  }
  
  if (!selectedInvoice) {
    return (
      <div className="text-center py-12">
        <h3 className="components font-medium text-gray-900 mb-2">Invoice not found</h3>
        <button
          onClick={() => navigate("/reports/invoice")}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Invoices
        </button>
      </div>
    )
  }
  
  return (
    <div className="space-y-6 text-[12px]" id="invoice-detail">
      {/* Email Status Notification */}
      {emailStatus === "success" && (
        <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50">
          <div className="flex items-center">
            <span>Email sent successfully!</span>
            <button onClick={() => dispatch(clearEmailStatus())} className="ml-4">
              <X size={16} />
            </button>
          </div>
        </div>
      )}
      
      {emailStatus === "failed" && (
        <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
          <div className="flex items-center">
            <span>Failed to send email. Please try again.</span>
            <button onClick={() => dispatch(clearEmailStatus())} className="ml-4">
              <X size={16} />
            </button>
          </div>
        </div>
      )}
      
      <EmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        emailData={emailData}
        setEmailData={setEmailData}
        onSubmit={handleSendEmailSubmit}
        emailStatus={emailStatus}
      />
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate("/reports/invoice")} 
              className="text-gray-600 hover:text-gray-800 print:hidden"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="font-bold text-gray-900">Invoice</h1>
          </div>
          
          <div className="flex items-center gap-3 print:hidden">
            <button
              onClick={handleSendEmail}
              className="flex items-center gap-2 px-3 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              <Mail size={16} />
              Email
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-3 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              <Printer size={16} />
              Print
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Download size={16} />
              Download
            </button>
          </div>
        </div>
        
        <InvoiceHeader invoice={selectedInvoice} />
        <PatientAndInvoiceInfo invoice={selectedInvoice} />
        <ServicesTable invoice={selectedInvoice} formatMoney={formatMoney} />
        <TotalAmount invoice={selectedInvoice} formatMoney={formatMoney} calculateSubtotal={calculateSubtotal} />
        
        {/* Notes */}
        {selectedInvoice.notes && (
          <div className="mt-8">
            <h3 className="components font-semibold text-gray-900 mb-4">Notes</h3>
            <p className="text-gray-600">{selectedInvoice.notes}</p>
          </div>
        )}
      </div>
    </div>
  )
}