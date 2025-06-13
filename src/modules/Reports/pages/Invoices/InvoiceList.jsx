import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchInvoices, sendInvoiceEmail, clearEmailStatus } from "../../action/slice"
import ReusableTable from "../../../../components/ui/SharedTable"
import { Search, FileText, Calendar, Filter, Mail, X } from "lucide-react"
import LoadingComponent from "../../../../components/ui/LoadingComponent"

export default function InvoiceList() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { invoices, loading, emailStatus } = useSelector((state) => state.reports)

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("")
  const [dateRange, setDateRange] = useState({ from: "", to: "" })

  // Email modal state
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [emailData, setEmailData] = useState({
    to: "",
    subject: "Your Invoice from Hospital Management System",
    message: "",
  })

  useEffect(() => {
    dispatch(fetchInvoices())
  }, [dispatch])

  useEffect(() => {
    if (emailStatus === "success") {
      setIsEmailModalOpen(false)
      setSelectedInvoice(null)
      setEmailData({
        to: "",
        subject: "Your Invoice from Hospital Management System",
        message: "",
      })

      // Clear the status after 3 seconds
      const timer = setTimeout(() => {
        dispatch(clearEmailStatus())
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [emailStatus, dispatch])

  const headers = [
    { key: "invoiceNo", label: "Invoice No" },
    { key: "patientName", label: "Patient Name" },
    { key: "department", label: "Department" },
    { key: "category", label: "Category" },
    { key: "paymentType", label: "Payment Type" },
    { key: "paidDate", label: "Date" },
    { key: "paidAmount", label: "Amount" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
  ]

  const handleView = (invoice) => {
    navigate(`/reports/invoices/detail/${invoice.id}`)
  }

  const handleSendEmail = (invoice) => {
    setSelectedInvoice(invoice)
    setEmailData({
      ...emailData,
      to: invoice.email,
      message: `Dear ${invoice.patientName},\n\nPlease find attached your invoice ${invoice.invoiceNo} for ${invoice.category} services at our hospital.\n\nTotal Amount: ${invoice.paidAmount}\nStatus: ${invoice.status}\n\nIf you have any questions, please don't hesitate to contact us.\n\nBest regards,\nHospital Management Team`,
    })
    setIsEmailModalOpen(true)
  }

  const handleSendEmailSubmit = (e) => {
    e.preventDefault()
    if (selectedInvoice) {
      dispatch(
        sendInvoiceEmail({
          invoiceId: selectedInvoice.id,
          emailData,
        }),
      )
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800"
      case "Unpaid":
        return "bg-red-100 text-red-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Refunded":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const renderCell = (key, invoice) => {
    if (key === "actions") {
      return (
        <div className="flex space-x-2">
          <button
            onClick={() => handleView(invoice)}
            className="text-blue-600 hover:text-blue-900 transition-colors"
            title="View Details"
          >
            <FileText size={14} />
          </button>
          <button
            onClick={() => handleSendEmail(invoice)}
            className="text-green-600 hover:text-green-900 transition-colors"
            title="Send Email"
          >
            <Mail size={14} />
          </button>
        </div>
      )
    }
    return null
  }

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "" || invoice.status === statusFilter
    const matchesDepartment = departmentFilter === "" || invoice.department === departmentFilter

    // Date filtering
    let matchesDate = true
    if (dateRange.from && dateRange.to) {
      // In a real app, you would use proper date parsing and comparison
      // This is simplified for the example
      matchesDate = true // Placeholder
    }

    return matchesSearch && matchesStatus && matchesDepartment && matchesDate
  })

  // Get unique departments for filter
  const departments = [...new Set(invoices.map((invoice) => invoice.department))]

  return (
    <div className="space-y-6 text-[12px]">
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

      {/* Email Modal */}
      {isEmailModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Send Invoice Email</h3>
              <button onClick={() => setIsEmailModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSendEmailSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Email</label>
                  <input
                    type="email"
                    value={emailData.to}
                    onChange={(e) => setEmailData({ ...emailData, to: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    value={emailData.subject}
                    onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    value={emailData.message}
                    onChange={(e) => setEmailData({ ...emailData, message: e.target.value })}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsEmailModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    disabled={emailStatus === "sending"}
                  >
                    {emailStatus === "sending" ? "Sending..." : "Send Email"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-xl font-bold text-gray-900 mb-6">Invoice Records</h1>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by patient or invoice..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="">All Statuses</option>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
              <option value="Pending">Pending</option>
              <option value="Refunded">Refunded</option>
            </select>
            <Filter className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>

          {/* Department Filter */}
          <div className="relative">
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="">All Departments</option>
              {departments.map((dept, index) => (
                <option key={index} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            <FileText className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>

          {/* Date Range Filter - Simplified for the example */}
          <div className="relative">
            <input
              type="date"
              placeholder="Filter by date"
              value={dateRange.from}
              onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Invoice Records Table */}
        {loading ? (
          <LoadingComponent/>
        ) : (
          <ReusableTable
            headers={headers}
            data={filteredInvoices}
            onView={handleView}
            getStatusColor={getStatusColor}
            renderCell={renderCell}
            keyField="id"
          />
        )}
      </div>
    </div>
  )
}
