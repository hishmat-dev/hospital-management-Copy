import {
  Home,
  Users,
  UserCheck,
  Calendar,
  Bed,
  FlaskRoundIcon as Flask,
  AlertTriangle,
  Activity,
  Clipboard,
  Settings,
} from "lucide-react"

export const menu = [
  {
    title: "Dashboard",
    icon: <Home size={18} />,
    path: "/hospital/dashboard",
  },
  {
    title: "Patient Management",
    icon: <Users size={18} />,
    children: [
      { title: "Add Patient", path: "/hospital/patients/add" },
      { title: "All Patients", path: "/hospital/patients/list" },
    ],
  },
  {
    title: "Doctor Management",
    icon: <UserCheck size={18} />,
    children: [
      { title: "Add Doctor", path: "/doctors/add" },
      { title: "All Doctors", path: "/doctors/list" },
    ],
  },
  {
    title: "Appointments",
    icon: <Calendar size={18} />,
    children: [
      { title: "Book Appointment", path: "/appointments/book" },
      { title: "Appointment List", path: "/appointments/list" },
    ],
  },
  {
    title: "Bed Management",
    icon: <Bed size={18} />,
    children: [
      { title: "Add Bed", path: "/beds/add" },
      { title: "Bed List", path: "/beds/list" },
    ],
  },
  {
    title: "Laboratory",
    icon: <Flask size={18} />,
    children: [
      { title: "Add Lab Test", path: "/laboratory/add" },
      { title: "Lab Reports", path: "/laboratory/reports" },
    ],
  },
  {
    title: "Emergency",
    icon: <AlertTriangle size={18} />,
    children: [
      { title: "Emergency Intake", path: "/emergency/intake" },
      { title: "Emergency Queue", path: "/emergency/queue" },
    ],
  },
  {
    title: "Vitals Tracking",
    icon: <Activity size={18} />,
    children: [
      { title: "Add Vitals", path: "/nursing/add" },
      { title: "Vitals Tracking", path: "/nursing/vitals" },
    ],
  },
  {
    title: "Reports",
    icon: <Clipboard size={18} />,
    children: [
      // { title: "All Reports", path: "/" },
      { title: "Payment Reports", path: "/reports/payment" },
      { title: "Invoice Reports", path: "/reports/invoice" },
    ],
  },
  {
    title: "Administrative",
    icon: <Settings size={18} />,
    children: [
      { title: "Lab Categories", path: "/admin/lab-categories" },
      { title: "Lab Templates", path: "/admin/lab-templates" },
    ],
  },
]
