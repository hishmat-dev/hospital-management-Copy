import {
  Home,
  Users,
  UserCheck,
  Calendar,
  Bed,
  FlaskRoundIcon as Flask,
  AlertTriangle,
  Activity,
  Settings,
} from "lucide-react"

export const menu = [
  {
    title: "Dashboard",
    icon: <Home size={18} />,
    path: "/dashboard",
  },
  {
    title: "Patient Management",
    icon: <Users size={18} />,
    children: [
      { title: "Add Patient", path: "/patients/add" },
      { title: "All Patients", path: "/patients/list" },
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
      // { title: "Assign Bed", path: "/beds/assign" },
    ],
  },
  {
    title: "Laboratory",
    icon: <Flask size={18} />,
    children: [
      { title: "Add Lab Test", path: "/laboratory/add" },
      { title: "Lab Reports", path: "/laboratory/reports" },
      // { title: "CBC Templete", path: "/laboratory/templete/CBC" },
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
    title: "Administrative",
    icon: <Settings size={18} />,
    children: [{ title: "Lab Report Template", path: "/admin/lab-templates" }],
  },
]
