// Patient API Service Laye
const API_BASE = "/api/patients"

// const mockPatients = [
//   {
//     id: "P-2001",
//     name: "Owais Shaikh",
//     age: 45,
//     gender: "Male",
//     phone: "+92-300-1234567",
//     dateOfBirth: "1978-05-20",
//     bloodType: "O+",
//     email: "owais.shaikh@example.com",
//     address: "House 45, PECHS Block 6, Karachi",
//     bloodGroup: "O+",
//     department: "Cardiology",
//     doctor: "Dr. Sarah Khan",
//     consultingDoctor: "Dr. Elina Akhtar",
//     recentVisit: "2025-01-22",
//     upcomingVisit: "2025-02-08",
//     admissionDate: "2024-01-15",
//     status: "Admitted",
//     medicalHistory: ["Hypertension", "Diabetes Type 2"],
//     emergencyContact: "Amina Shaikh - +92-301-7654321",
//     insurance: "State Life Insurance",
//     allergies: ["Penicillin", "Shellfish"],
//   },
//   {
//     id: "P-2002",
//     name: "Areeba Tariq",
//     age: 32,
//     gender: "Female",
//     phone: "+92-331-9876543",
//     dateOfBirth: "1992-04-10",
//     bloodType: "A+",
//     email: "areeba.tariq@example.com",
//     address: "Flat 12-B, Gulshan-e-Iqbal, Lahore",
//     bloodGroup: "A+",
//     department: "Orthopedics",
//     doctor: "Dr. Hamza Raza",
//     consultingDoctor: "Dr. Elina Akhtar",
//     recentVisit: "2025-01-12",
//     upcomingVisit: "2025-03-01",
//     admissionDate: "2024-12-20",
//     status: "Discharged",
//     medicalHistory: ["Fracture History"],
//     emergencyContact: "Tariq Mehmood - +92-334-5556789",
//     insurance: "EFU HealthCare",
//     allergies: ["None"],
//   },
//   {
//     id: "P-2003",
//     name: "Bilal Ahmed",
//     age: 28,
//     gender: "Male",
//     phone: "+92-345-1122334",
//     dateOfBirth: "1996-02-15",
//     bloodType: "B+",
//     email: "bilal.ahmed@example.com",
//     address: "House 89, F-8/3, Islamabad",
//     bloodGroup: "B+",
//     department: "Emergency",
//     doctor: "Dr. Saima Malik",
//     consultingDoctor: "Dr. Yasir Mehmood",
//     recentVisit: "2025-01-25",
//     upcomingVisit: "2025-02-15",
//     admissionDate: "2024-11-05",
//     status: "Under Treatment",
//     medicalHistory: ["Asthma"],
//     emergencyContact: "Hina Ahmed - +92-300-9988776",
//     insurance: "Jubilee Life",
//     allergies: ["Dust", "Pollen"],
//   },
//   {
//     id: "P-2004",
//     name: "Sana Baloch",
//     age: 55,
//     gender: "Female",
//     phone: "+92-321-4455667",
//     dateOfBirth: "1970-08-30",
//     bloodType: "AB+",
//     email: "sana.baloch@example.com",
//     address: "Bungalow 22, Satellite Town, Quetta",
//     bloodGroup: "AB+",
//     department: "Neurology",
//     doctor: "Dr. Asad Shah",
//     consultingDoctor: "Dr. Fariha Siddiqui",
//     recentVisit: "2025-01-20",
//     upcomingVisit: "2025-02-20",
//     admissionDate: "2025-01-10",
//     status: "Admitted",
//     medicalHistory: ["Migraine", "High Blood Pressure"],
//     emergencyContact: "Iqbal Baloch - +92-312-3344556",
//     insurance: "Adamjee Health",
//     allergies: ["Latex"],
//   },
// ];

// const {patients}  = useSelector((state) => state.patients)

export const patientService = {
  // CRUD Operations
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    const response = await fetch(`${API_BASE}?${queryString}`)
    return response.json()
  },
  // getAll: async (filters) => {
  //   let filteredPatients = [...patients];

  //   if (filters.search) {
  //     filteredPatients = filteredPatients.filter(
  //       (p) =>
  //         p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
  //         p.id.toLowerCase().includes(filters.search.toLowerCase())
  //     );
  //   }
  //   if (filters.department) {
  //     filteredPatients = filteredPatients.filter((p) => p.department === filters.department);
  //   }
  //   if (filters.status) {
  //     filteredPatients = filteredPatients.filter((p) => p.status === filters.status);
  //   }

  //   if (filters.sortBy) {
  //     filteredPatients.sort((a, b) => {
  //       if (filters.sortBy === "name") {
  //         return a.name.localeCompare(b.name);
  //       } else if (filters.sortBy === "admissionDate") {
  //         return new Date(b.admissionDate) - new Date(a.admissionDate);
  //       } else if (filters.sortBy === "department") {
  //         return a.department.localeCompare(b.department);
  //       }
  //       return 0;
  //     });
  //   }

  //   return {
  //     data: filteredPatients,
  //     total: filteredPatients.length,
  //   };
  // },

  getById: async (id) => {
    const response = await fetch(`${API_BASE}/${id}`)
    return response.json()
  },

  create: async (patientData) => {
    const response = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patientData),
    })
    return response.json()
  },

  update: async (id, patientData) => {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patientData),
    })
    return response.json()
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "DELETE",
    })
    return response.json()
  },

  // Advanced Operations
  search: async (searchTerm) => {
    const response = await fetch(`${API_BASE}/search?q=${searchTerm}`)
    return response.json()
  },

  getByDepartment: async (department) => {
    const response = await fetch(`${API_BASE}/department/${department}`)
    return response.json()
  },
}
