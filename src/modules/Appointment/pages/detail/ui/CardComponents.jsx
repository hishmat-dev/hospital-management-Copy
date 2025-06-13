import PropTypes from "prop-types"
import { Calendar } from "lucide-react"

// Reusable Header Component
export const HeaderCard = ({ title, icon: Icon }) => (
  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3">
    <h1 className="font-bold flex items-center">
      <Icon className="w-7 h-7 mr-3" />
      {title}
    </h1>
  </div>
)

HeaderCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
}

// Reusable Info Card Component
export const InfoCard = ({ title, icon: Icon, children, bgColor, textColor }) => (
  <div className={`p-6 rounded-lg ${bgColor}`}>
    <h3 className={`font-semibold text-blue-800 mb-4 flex items-center ${textColor}`}>
      <Icon className="w-6 h-6 mr-2" />
      {title}
    </h3>
    <div className="space-y-3 text-gray-700">{children}</div>
  </div>
)

InfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  children: PropTypes.node.isRequired,
  bgColor: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
}