import React from "react"

const cbcTemplate = [
  { name: "Hemoglobin", unit: "g/dL", ref: "13.0 - 17.0" },
  { name: "RBC Count", unit: "million/cc", ref: "4.5 - 5.2" },
  { name: "HCT", unit: "%", ref: "40 - 50" },
  { name: "MCV", unit: "fL", ref: "80 - 96" },
  { name: "MCH", unit: "Pg", ref: "27 - 33" },
  { name: "MCHC", unit: "%", ref: "32 - 36" },
  { name: "RDW-CV", unit: "%", ref: "11 - 16" },
  { name: "RDW-SD", unit: "fL", ref: "35 - 56" },
  { name: "Platelet Count", unit: "10³/µL", ref: "150 - 410" },
  { name: "MPV", unit: "fL", ref: "6.5 - 12.0" },
  { name: "PDW", unit: "fL", ref: "25 - 65" },
  { name: "PCT", unit: "%", ref: "0.108 - 0.282" },
  { name: "Total WBC Count", unit: "10³/µL", ref: "4.0 - 10.0" },
  { name: "Neutrophils (%)", unit: "%", ref: "40 - 70" },
  { name: "Lymphocytes (%)", unit: "%", ref: "20 - 40" },
]

const CBC = ({ results, onChange }) => {
  const finalResults = results.length
    ? results
    : cbcTemplate.map((item) => ({ ...item, value: "" }))

  return (
    <div className="space-y-3">
      {finalResults.map((item, index) => (
        <div key={index} className="grid grid-cols-4 items-center gap-4">
          <label className="font-medium">{item.name}</label>
          <input
            type="text"
            value={item.value}
            onChange={(e) => onChange(index, "value", e.target.value)}
            className="border px-2 py-1 rounded w-full"
          />
          <span className="text-sm text-gray-600">{item.unit}</span>
          <span className="text-sm text-gray-400">{item.ref}</span>
        </div>
      ))}
    </div>
  )
}

export default CBC
