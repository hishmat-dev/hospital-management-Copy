export default function ServicesTable({ invoice, formatMoney }) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Services</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-sm font-semibold text-gray-900 border-b">Description</th>
              <th className="px-4 py-2 text-sm font-semibold text-gray-900 border-b">Quantity</th>
              <th className="px-4 py-2 text-sm font-semibold text-gray-900 border-b">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items && invoice.items.length > 0 ? (
              invoice.items.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{item.description || "N/A"}</td>
                  <td className="px-4 py-2">{item.quantity || 1}</td>
                  <td className="px-4 py-2">{item.amount ? formatMoney(item.amount) : "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-4 py-2 text-center text-gray-600">
                  No services listed
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}