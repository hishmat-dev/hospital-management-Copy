export default function InvoiceHeader({ invoice }) {
  return (
    <div className="border-b pb-6 mb-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{invoice.invoiceNo || "N/A"}</h2>
          <p className="text-gray-600">
            <span
              className={`inline-block px-2 py-1 rounded-sm text-xs ${
                invoice.status === "Paid"
                  ? "bg-green-100 text-green-800"
                  : invoice.status === "Pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : invoice.status === "Unpaid"
                  ? "bg-red-100 text-red-800"
                  : invoice.status === "Refunded"
                  ? "bg-purple-100 text-purple-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {invoice.status || "N/A"}
            </span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-gray-600">Invoice Date</p>
          <p className="font-medium">
            {invoice.paidDate !== "-" ? invoice.paidDate : new Date().toLocaleDateString()}
          </p>
          {invoice.dueDate && (
            <>
              <p className="text-gray-600 mt-2">Due Date</p>
              <p className="font-medium">{invoice.dueDate}</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}