// Patient API Service Layer
const API_BASE = "/api/patients"

const mockPatients= [
    {
      id: "P-1001",
      name: "John Smith",
      age: 45,
      gender: "Male",
      phone: "+1-555-0123",
      email: "john.smith@email.com",
      address: "123 Main St, City, State 12345",
      bloodGroup: "O+",
      department: "Cardiology",
      doctor: "Dr. Sarah Wilson",
      admissionDate: "2024-01-15",
      status: "Admitted",
      medicalHistory: ["Hypertension", "Diabetes Type 2"],
      emergencyContact: "Jane Smith - +1-555-0124",
      insurance: "Blue Cross Blue Shield",
      allergies: ["Penicillin", "Shellfish"],
    },
    {
      id: "P-1002",
      name: "Emma Johnson",
      age: 32,
      gender: "Female",
      phone: "+1-555-0124",
      email: "emma.johnson@email.com",
      address: "456 Oak Ave, City, State 12345",
      bloodGroup: "A+",
      department: "Orthopedics",
      doctor: "Dr. Michael Brown",
      admissionDate: "2024-01-14",
      status: "Discharged",
      medicalHistory: ["Fracture History"],
      emergencyContact: "Robert Johnson - +1-555-0125",
      insurance: "Aetna",
      allergies: ["None"],
    },
    {
      id: "P-1003",
      name: "Michael Davis",
      age: 28,
      gender: "Male",
      phone: "+1-555-0126",
      email: "michael.davis@email.com",
      address: "789 Pine St, City, State 12345",
      bloodGroup: "B+",
      department: "Emergency",
      doctor: "Dr. Lisa Anderson",
      admissionDate: "2024-01-16",
      status: "Under Treatment",
      medicalHistory: ["Asthma"],
      emergencyContact: "Sarah Davis - +1-555-0127",
      insurance: "United Healthcare",
      allergies: ["Dust", "Pollen"],
    },
    {
      id: "P-1004",
      name: "Sarah Wilson",
      age: 55,
      gender: "Female",
      phone: "+1-555-0128",
      email: "sarah.wilson@email.com",
      address: "321 Elm St, City, State 12345",
      bloodGroup: "AB+",
      department: "Neurology",
      doctor: "Dr. James Miller",
      admissionDate: "2024-01-13",
      status: "Admitted",
      medicalHistory: ["Migraine", "High Blood Pressure"],
      emergencyContact: "Tom Wilson - +1-555-0129",
      insurance: "Cigna",
      allergies: ["Latex"],
    },
  ];

export const patientService = {
  // CRUD Operations
  // getAll: async (params = {}) => {
  //   const queryString = new URLSearchParams(params).toString()
  //   const response = await fetch(`${API_BASE}?${queryString}`)
  //   return response.json()
  // },
  getAll: async (filters) => {
    let filteredPatients = [...mockPatients];

    if (filters.search) {
      filteredPatients = filteredPatients.filter(
        (p) =>
          p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          p.id.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    if (filters.department) {
      filteredPatients = filteredPatients.filter((p) => p.department === filters.department);
    }
    if (filters.status) {
      filteredPatients = filteredPatients.filter((p) => p.status === filters.status);
    }

    if (filters.sortBy) {
      filteredPatients.sort((a, b) => {
        if (filters.sortBy === "name") {
          return a.name.localeCompare(b.name);
        } else if (filters.sortBy === "admissionDate") {
          return new Date(b.admissionDate) - new Date(a.admissionDate);
        } else if (filters.sortBy === "department") {
          return a.department.localeCompare(b.department);
        }
        return 0;
      });
    }

    return {
      data: filteredPatients,
      total: filteredPatients.length,
    };
  },

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
