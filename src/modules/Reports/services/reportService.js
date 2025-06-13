// Mock data for payments
const paymentData = [
  {
    id: "PAY-001",
    invoiceNo: "#INV-00123",
    patientName: "Muhammad Ahmed",
    patientId: "PT-001",
    department: "Cardiology",
    category: "Consultation",
    paymentType: "Cash",
    paidDate: "15/06/2024",
    paidAmount: "Rs. 3,500",
    status: "Paid",
    email: "ahmed.m@gmail.com",
    phone: "+92-321-1234567",
    address: "House 123, Block F, DHA Phase 5, Lahore",
    doctor: "Dr. Asim Khan",
    items: [
      { description: "Consultation Fee", amount: "Rs. 2,000" },
      { description: "ECG Test", amount: "Rs. 1,500" },
    ],
  },
  {
    id: "PAY-002",
    invoiceNo: "#INV-00124",
    patientName: "Ayesha Malik",
    patientId: "PT-002",
    department: "Gynecology",
    category: "Checkup",
    paymentType: "Credit Card",
    paidDate: "16/06/2024",
    paidAmount: "Rs. 5,000",
    status: "Paid",
    email: "ayesha.malik@yahoo.com",
    phone: "+92-333-9876543",
    address: "Flat 4B, Al-Fatah Towers, Clifton, Karachi",
    doctor: "Dr. Sadia Amir",
    items: [
      { description: "Consultation Fee", amount: "Rs. 2,500" },
      { description: "Ultrasound", amount: "Rs. 2,500" },
    ],
  },
  {
    id: "PAY-003",
    invoiceNo: "#INV-00125",
    patientName: "Farhan Qureshi",
    patientId: "PT-003",
    department: "Orthopedics",
    category: "Surgery",
    paymentType: "Bank Transfer",
    paidDate: "17/06/2024",
    paidAmount: "Rs. 45,000",
    status: "Paid",
    email: "farhan.q@outlook.com",
    phone: "+92-345-5678901",
    address: "House 78, Street 12, F-10/2, Islamabad",
    doctor: "Dr. Kamran Akmal",
    items: [
      { description: "Surgery Fee", amount: "Rs. 35,000" },
      { description: "Hospital Stay (1 day)", amount: "Rs. 8,000" },
      { description: "Medications", amount: "Rs. 2,000" },
    ],
  },
  {
    id: "PAY-004",
    invoiceNo: "#INV-00126",
    patientName: "Zainab Hassan",
    patientId: "PT-004",
    department: "Dermatology",
    category: "Treatment",
    paymentType: "EasyPaisa",
    paidDate: "18/06/2024",
    paidAmount: "Rs. 7,500",
    status: "Paid",
    email: "zainab.h@gmail.com",
    phone: "+92-300-1122334",
    address: "House 45, Block B, Gulshan-e-Iqbal, Karachi",
    doctor: "Dr. Nadia Hussain",
    items: [
      { description: "Consultation Fee", amount: "Rs. 3,000" },
      { description: "Laser Treatment", amount: "Rs. 4,500" },
    ],
  },
  {
    id: "PAY-005",
    invoiceNo: "#INV-00127",
    patientName: "Imran Ali",
    patientId: "PT-005",
    department: "Neurology",
    category: "Diagnosis",
    paymentType: "JazzCash",
    paidDate: "19/06/2024",
    paidAmount: "Rs. 12,000",
    status: "Pending",
    email: "imran.ali@hotmail.com",
    phone: "+92-311-9876543",
    address: "House 22, Street 7, Model Town, Lahore",
    doctor: "Dr. Faisal Masood",
    items: [
      { description: "Consultation Fee", amount: "Rs. 3,500" },
      { description: "MRI Scan", amount: "Rs. 8,500" },
    ],
  },
  {
    id: "PAY-006",
    invoiceNo: "#INV-00128",
    patientName: "Saima Nawaz",
    patientId: "PT-006",
    department: "Ophthalmology",
    category: "Surgery",
    paymentType: "Cash",
    paidDate: "20/06/2024",
    paidAmount: "Rs. 25,000",
    status: "Paid",
    email: "saima.n@gmail.com",
    phone: "+92-333-1234987",
    address: "Flat 7C, Al-Noor Heights, Gulberg III, Lahore",
    doctor: "Dr. Tariq Mahmood",
    items: [
      { description: "Cataract Surgery", amount: "Rs. 20,000" },
      { description: "Pre-op Assessment", amount: "Rs. 2,000" },
      { description: "Medications", amount: "Rs. 3,000" },
    ],
  },
  {
    id: "PAY-007",
    invoiceNo: "#INV-00129",
    patientName: "Usman Khan",
    patientId: "PT-007",
    department: "Dentistry",
    category: "Treatment",
    paymentType: "Credit Card",
    paidDate: "21/06/2024",
    paidAmount: "Rs. 8,000",
    status: "Refunded",
    email: "usman.k@yahoo.com",
    phone: "+92-321-9876123",
    address: "House 34, Block D, Satellite Town, Rawalpindi",
    doctor: "Dr. Amina Khalid",
    items: [
      { description: "Root Canal Treatment", amount: "Rs. 6,000" },
      { description: "X-Ray", amount: "Rs. 1,000" },
      { description: "Medications", amount: "Rs. 1,000" },
    ],
  },
  {
    id: "PAY-008",
    invoiceNo: "#INV-00130",
    patientName: "Nadia Chaudhry",
    patientId: "PT-008",
    department: "Pediatrics",
    category: "Consultation",
    paymentType: "Bank Transfer",
    paidDate: "22/06/2024",
    paidAmount: "Rs. 2,500",
    status: "Paid",
    email: "nadia.c@gmail.com",
    phone: "+92-345-6789012",
    address: "House 56, Street 11, Bahria Town Phase 4, Islamabad",
    doctor: "Dr. Yasir Hameed",
    items: [
      { description: "Consultation Fee", amount: "Rs. 2,000" },
      { description: "Vaccination", amount: "Rs. 500" },
    ],
  },
  {
    id: "PAY-009",
    invoiceNo: "#INV-00131",
    patientName: "Bilal Ahmed",
    patientId: "PT-009",
    department: "Pulmonology",
    category: "Diagnosis",
    paymentType: "EasyPaisa",
    paidDate: "23/06/2024",
    paidAmount: "Rs. 6,500",
    status: "Pending",
    email: "bilal.a@outlook.com",
    phone: "+92-300-8765432",
    address: "House 89, Block F, North Nazimabad, Karachi",
    doctor: "Dr. Hasan Ali",
    items: [
      { description: "Consultation Fee", amount: "Rs. 2,500" },
      { description: "Pulmonary Function Test", amount: "Rs. 4,000" },
    ],
  },
  {
    id: "PAY-010",
    invoiceNo: "#INV-00132",
    patientName: "Sana Riaz",
    patientId: "PT-010",
    department: "Endocrinology",
    category: "Checkup",
    paymentType: "JazzCash",
    paidDate: "24/06/2024",
    paidAmount: "Rs. 4,500",
    status: "Paid",
    email: "sana.r@gmail.com",
    phone: "+92-311-2345678",
    address: "House 12, Street 5, Johar Town, Lahore",
    doctor: "Dr. Farah Kamal",
    items: [
      { description: "Consultation Fee", amount: "Rs. 3,000" },
      { description: "Blood Tests", amount: "Rs. 1,500" },
    ],
  },
]

// Mock data for invoices (using the same data structure but with some unpaid invoices)
const invoiceData = [
  ...paymentData,
  {
    id: "INV-011",
    invoiceNo: "#INV-00133",
    patientName: "Kamran Akbar",
    patientId: "PT-011",
    department: "Cardiology",
    category: "Diagnosis",
    paymentType: "Pending",
    paidDate: "-",
    paidAmount: "Rs. 15,000",
    status: "Unpaid",
    email: "kamran.a@gmail.com",
    phone: "+92-321-7654321",
    address: "House 78, Block C, Valencia Town, Lahore",
    doctor: "Dr. Asim Khan",
    items: [
      { description: "Consultation Fee", amount: "Rs. 3,000" },
      { description: "Angiography", amount: "Rs. 12,000" },
    ],
    dueDate: "30/06/2024",
  },
  {
    id: "INV-012",
    invoiceNo: "#INV-00134",
    patientName: "Amina Shahid",
    patientId: "PT-012",
    department: "Gynecology",
    category: "Surgery",
    paymentType: "Pending",
    paidDate: "-",
    paidAmount: "Rs. 35,000",
    status: "Unpaid",
    email: "amina.s@yahoo.com",
    phone: "+92-333-1122334",
    address: "Flat 12B, Askari Towers, Gulistan-e-Johar, Karachi",
    doctor: "Dr. Sadia Amir",
    items: [
      { description: "Surgery Fee", amount: "Rs. 25,000" },
      { description: "Hospital Stay (2 days)", amount: "Rs. 8,000" },
      { description: "Medications", amount: "Rs. 2,000" },
    ],
    dueDate: "05/07/2024",
  },
  {
    id: "INV-013",
    invoiceNo: "#INV-00135",
    patientName: "Tariq Mehmood",
    patientId: "PT-013",
    department: "Orthopedics",
    category: "Treatment",
    paymentType: "Pending",
    paidDate: "-",
    paidAmount: "Rs. 8,500",
    status: "Unpaid",
    email: "tariq.m@gmail.com",
    phone: "+92-345-9876543",
    address: "House 45, Street 8, G-10/2, Islamabad",
    doctor: "Dr. Kamran Akmal",
    items: [
      { description: "Consultation Fee", amount: "Rs. 2,500" },
      { description: "Physiotherapy (3 sessions)", amount: "Rs. 6,000" },
    ],
    dueDate: "28/06/2024",
  },
]

export const reportService = {
  // Payment methods
  getPayments: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(paymentData)
      }, 500)
    })
  },

  getPaymentById: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const payment = paymentData.find((p) => p.id === id)
        if (payment) {
          resolve(payment)
        } else {
          reject(new Error("Payment not found"))
        }
      }, 500)
    })
  },

  // Invoice methods
  getInvoices: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(invoiceData)
      }, 500)
    })
  },

  getInvoiceById: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const invoice = invoiceData.find((i) => i.id === id)
        if (invoice) {
          resolve(invoice)
        } else {
          reject(new Error("Invoice not found"))
        }
      }, 500)
    })
  },

  sendInvoiceEmail: (invoiceId, emailData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real app, this would send an actual email
        console.log(`Sending invoice ${invoiceId} to ${emailData.to}`)
        console.log("Email data:", emailData)
        resolve({ success: true, message: "Email sent successfully" })
      }, 1000)
    })
  },
}
