import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchPayments } from "../../action/slice"
import ReusableTable from "../../../../components/ui/SharedTable"
import { Search, FileText, Calendar, Filter } from "lucide-react"
import LoadingComponent from "../../../../components/ui/LoadingComponent"

export default function PaymentList() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { payments, loading } = useSelector((state) => state.reports)

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("")
  const [dateRange, setDateRange] = useState({ from: "", to: "" })

  useEffect(() => {
    dispatch(fetchPayments())
  }, [dispatch])

  const headers = [
    { key: "invoiceNo", label: "Invoice No" },
    { key: "patientName", label: "Patient Name" },
    { key: "department", label: "Department" },
    { key: "category", label: "Category" },
    { key: "paymentType", label: "Payment Type" },
    { key: "paidDate", label: "Paid Date" },
    { key: "paidAmount", label: "Amount" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
  ]

  const handleView = (payment) => {
    navigate(`/reports/payments/detail/${payment.id}`)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Refunded":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "" || payment.status === statusFilter
    const matchesDepartment = departmentFilter === "" || payment.department === departmentFilter

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
  const departments = [...new Set(payments.map((payment) => payment.department))]

  return (
    <div className="space-y-6 text-[12px]">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-xl font-bold text-gray-900 mb-6">Payment Records</h1>

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

        {/* Payment Records Table */}
        {loading ? (
          <LoadingComponent/>
        ) : (
          <ReusableTable
            headers={headers}
            data={filteredPayments}
            onView={handleView}
            getStatusColor={getStatusColor}
            keyField="id"
          />
        )}
      </div>
    </div>
  )
}
