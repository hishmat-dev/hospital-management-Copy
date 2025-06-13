import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { menu } from "./menu";
import logo from "../../shared/workwise-black.png";
import { ThemeContext } from './../../ThemeContext';

export default function Sidebar() {
  const [openMenus, setOpenMenus] = useState({});
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isThemePickerOpen, setIsThemePickerOpen] = useState(false);
  const { selectedTheme, setSelectedTheme } = useContext(ThemeContext);
  const location = useLocation();

  // Define available theme colors from Tailwind config
  const themeColors = [
    { name: "blue-hosta", value: "#64C4B2" },
    { name: "medium-turquoise", value: "#45C6EE" },
    { name: "waikawa-grey", value: "#526BB1" },
    { name: "vivid-cerise", value: "#DA1D81" },
    { name: "bright-sun", value: "#FED33C" },
    
  ];

  // Initialize theme from localStorage or default
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "primary-color";
    setSelectedTheme(savedTheme);
    document.documentElement.style.setProperty(
      "--theme-primary",
      themeColors.find((c) => c.name === savedTheme).value
    );
  }, [setSelectedTheme]);

  const toggleMenu = (title) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const isParentActive = (children) => {
    return children?.some((child) => location.pathname === child.path);
  };

  // Handle theme selection
  const handleThemeChange = (colorName) => {
    setSelectedTheme(colorName);
    // setIsThemePickerOpen(false);
    document.documentElement.style.setProperty("--theme-primary", themeColors.find((c) => c.name === colorName).value);
    localStorage.setItem("theme", colorName); // Persist theme selection
  };

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
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        <div className="mt-0">
          <img src={logo} alt="Logo" className="w-24 h-auto mx-auto" />
        </div>

        {/* Theme Toggle Button */}
        <div className="mt-4">
          <button
            onClick={() => setIsThemePickerOpen(!isThemePickerOpen)}
            className="w-full flex items-center justify-between p-2 text-left text-[12px] rounded bg-gray-100 text-gray-900 hover:bg-gray-200"
          >
            <span className="font-medium">Change Theme</span>
            {isThemePickerOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>

          {/* Theme Color Picker */}
          {isThemePickerOpen && (
            <div className="flex flex-row mt-2 ml-2">
              {themeColors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => handleThemeChange(color.name)}
                  className={`w-full flex items-center gap-2  rounded`}
                >
                  <div
                    className="w-6 h-6 rounded-full border"
                    style={{ backgroundColor: color.value }}
                  />
                  
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="space-y-2 text-[12px] mt-4">
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
  );
}