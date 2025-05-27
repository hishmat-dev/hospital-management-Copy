const InfoItem = ({ label, value }) => (
  <p>
    <span className="font-medium">{label}:</span>{" "}
    {typeof value === "object" ? value : value || "—"}
  </p>
)

export default InfoItem
