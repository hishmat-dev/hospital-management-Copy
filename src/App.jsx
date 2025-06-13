import { Provider } from "react-redux"
import { useState } from "react"
import { store } from "./store/store"
import Sidebar from "./components/layout/Sidebar"
import AppRoutes from "./components/routes/AppRoutes"
import { ThemeProvider } from "./ThemeContext"

export default function App() {
  const [selectedTheme, setSelectedTheme] = useState("primary-color");
  return (
    <ThemeProvider selectedTheme={selectedTheme} setSelectedTheme={setSelectedTheme}>
      <Provider store={store}>
        <div className="flex h-screen overflow-hidden bg-gray-50 font-montserrat">
          {/* Sidebar (fixed left) */}
          <div className="md:w-56 w-0 md:block">
            <Sidebar />
          </div>

          {/* Scrollable Main Content */}
          <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
            <AppRoutes />
          </main>
        </div>
      </Provider>
    </ThemeProvider>
  )
}
