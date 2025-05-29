import { Provider } from "react-redux"
import { store } from "./store/store"
import Sidebar from "./components/layout/Sidebar"
import AppRoutes from "./components/routes/AppRoutes"

export default function App() {
  return (
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
  )
}
