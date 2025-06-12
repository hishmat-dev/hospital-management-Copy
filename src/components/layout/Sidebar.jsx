import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react"
import { menu } from "./menu"
import logo from "../../shared/workwise-black.png"

export default function Sidebar() {
  const [openMenus, setOpenMenus] = useState({})
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const location = useLocation()

  const toggleMenu = (title) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  const isParentActive = (children) => {
    return children?.some((child) => location.pathname === child.path)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded shadow"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed z-50 top-0 left-0 h-full w-56 bg-white text-gray-900 p-4 overflow-y-auto scrollbar-hide transform transition-transform duration-300 ease-in-out
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:flex md:flex-col
        `}
        style={{
          msOverflowStyle: "none" /* Hide scrollbar for IE and Edge */,
          scrollbarWidth: "none" /* Hide scrollbar for Firefox */,
        }}
      >
        
        <div className="mt-0">
          <img
            src={logo} // Replace with your logo path
            alt="Logo"
            className="w-24 h-auto mx-auto" // Adjust width and styling as needed
          />
        </div>
        {/* Navigation */}
        <nav className="space-y-2 text-[12px]">
          {menu.map((item, index) => (
            <div key={index}>
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleMenu(item.title)}
                    className={`
                      w-full flex items-center justify-between p-2 text-left rounded transition-colors duration-200
                      ${isParentActive(item.children) ? "bg-gray-200 text-gray-900" : "text-gray-900 hover:bg-gray-200"}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span className="font-medium">{item.title}</span>
                    </div>
                    {openMenus[item.title] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>

                  {openMenus[item.title] && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.children.map((child, childIndex) => (
                        <Link
                          key={childIndex}
                          to={child.path}
                          onClick={() => setIsMobileOpen(false)}
                          className={`
                            block p-1 rounded transition-colors duration-200
                            ${
                              isActive(child.path)
                                ? "bg-gray-300 text-gray-900 font-medium"
                                : "text-gray-900 hover:bg-gray-300"
                            }
                          `}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={`
                    flex items-center gap-3 p-2 rounded transition-colors duration-200
                    ${isActive(item.path) ? "bg-gray-200 text-gray-900 font-medium" : "text-gray-900 hover:bg-gray-200"}
                  `}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden" onClick={() => setIsMobileOpen(false)} />
      )}
    </>
  )
}