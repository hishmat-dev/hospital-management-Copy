const Section = ({ title, children }) => (
  <div className="mb-8">
    <h3 className="font-semibold text-primary-color mb-3">{title}</h3>
    <div className="space-y-2">{children}</div>
  </div>
)
export default Section
