import { Save, X, Loader2 } from "lucide-react";

export default function Btn({ onCancel, loading, disabled }) {
  return (
    <div className="flex space-x-4 pt-6 border-t border-gray-200">
      <button
        type="submit"
        // disabled={loading || disabled}
        aria-label={loading ? "Ordering tests" : "Order lab tests"}
        // aria-disabled={loading || disabled}
        className="bg-primary-color text-white px-6 py-3 rounded-lg disabled:opacity-80 disabled:cursor-not-allowed flex items-center space-x-2 justify-center  transition-colors"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            <span>Ordering...</span>
          </>
        ):(
          <>
            <Save size={16} />
            <span>Order Test</span>
          </>
        )}
      </button>

      <button
        type="button"
        onClick={onCancel}
        disabled={loading}
        aria-label="Cancel lab test order"
        aria-disabled={loading}
        className="bg-red-color text-white px-6 py-2 rounded-lg disabled:opacity-50 flex items-center space-x-2"
      >
        <X size={16} />
        <span>Cancel</span>
      </button>
    </div>
  )
}
