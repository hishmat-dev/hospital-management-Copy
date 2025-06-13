export default function TotalAmount({ invoice, formatMoney, calculateSubtotal }) {
  return (
    <div className="flex justify-end">
      <div className="w-full max-w-xs">
        <div className="border-t pt-4">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>{calculateSubtotal(invoice.items)}</span>
          </div>
          <div className="flex justify-between text-gray-600 mt-2">
            <span>Tax</span>
            <span>{formatMoney(invoice.tax) || "N/A"}</span>
          </div>
          <div className="flex justify-between font-semibold text-gray-900 mt-2">
            <span>Total</span>
            <span>{formatMoney(invoice.paidAmount)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}