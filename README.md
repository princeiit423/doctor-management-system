# 🩺 Doctor Management System – Full-Stack Appointment & Healthcare Portal

The **Doctor Management System** is a robust, full-stack healthcare web application built using the **MERN Stack**. It streamlines online doctor appointments, profile management, and secure payment handling through Razorpay. The system is designed for **Patients (Users)**, **Doctors**, and **Admins** with dedicated dashboards and role-based access.

---

## 🌟 Key Features

### 👨‍💻 User Panel
- 🔐 Register/Login with JWT Authentication
- 🔍 Browse and search for doctors
- 📅 Book appointments with preferred doctors
- 💳 Pay securely via Razorpay gateway
- 📄 View booking history and invoices
- 👤 Update personal profile

### 🩺 Doctor Panel
- 📝 Apply/Register as a doctor
- 🆔 Await admin approval before activation
- 📅 Manage availability and appointments
- ✅ Accept/Reject booking requests
- 📊 Dashboard with appointments overview

### 🛠️ Admin Panel
- 🔐 Admin login with elevated access
- 👥 Manage users and doctors (approve, block, delete)
- 📆 View and manage all appointments
- 💳 Track payment and transaction details
- 📊 Platform-wide analytics and insights (optional)

---

## 🛠️ Tech Stack

| Layer        | Tech Used                            |
|--------------|--------------------------------------|
| **Frontend** | React.js, Axios, React Router, Redux |
| **Backend**  | Node.js, Express.js                  |
| **Database** | MongoDB with Mongoose                |
| **Auth**     | JWT (JSON Web Tokens), bcrypt        |
| **Payments** | Razorpay API Integration             |
| **Others**   | dotenv, nodemailer (optional), cors  |

---

## 🔐 Authentication & Authorization

- JWT is used for secure, stateless authentication.
- Role-based authorization ensures secure access to:
  - `/user` routes (for general users)
  - `/doctor` routes (for doctors)
  - `/admin` routes (for platform managers)

---

## 📁 Folder Structure (Simplified)

doctor-management-system/ ├── client/ # React Frontend │ ├── src/ │ │ ├── components/ │ │ ├── pages/ │ │ ├── redux/ │ │ └── App.js │ └── package.json ├── server/ # Node.js Backend │ ├── controllers/ │ ├── models/ │ ├── routes/ │ ├── middleware/ │ ├── utils/ │ ├── config/ │ └── server.js ├── .env └── README.md


---

## 🚀 Getting Started

### Prerequisites

- Node.js & npm
- MongoDB Atlas account
- Razorpay account (for API keys)

### 1. Clone the Repo

git clone https://github.com/your-username/doctor-management-system.git
cd doctor-management-system

### 2. Backend Setup
cd backend
npm install
npm nodemon server.js

Create .env file inside /server:
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret

npm run server

### 3. Frontend Setup
cd frontend
npm install
npm run dev

Visit: http://localhost:3000

### 4. Admin Setup
cd admin
npm install
npm run dev

💳 Razorpay Integration
User can book and pay for an appointment securely.

Payment success triggers an update in the backend and stores the appointment data.

Razorpay API keys are securely handled via .env and sent via backend routes.

📷 Screenshots / Demo

📦 Deployment
This project can be deployed on:

Frontend: Vercel / Netlify

Backend: Render / Railway / Cyclic

Database: MongoDB Atlas

👨‍💻 Developer
Faiz Hussain
📧 faiz18513@gmail.com
🔗 gtihub.com/princeiit423

📄 License
This project is licensed under the MIT License

Would you like me to help with a `landing page design`, `logo`, or `deployment setup guide` for this project as well?


