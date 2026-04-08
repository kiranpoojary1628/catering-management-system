This project is a full-stack Catering Management System built using React, Node.js, and Express. It includes booking management, delivery tracking, admin dashboard, and email notifications.


# Catering Management System (Full Stack) — Booking, Delivery & Admin Dashboard

Caterers  is a full-stack web application designed to simulate how a real catering business can manage its services digitally. The purpose of this project was to move beyond a simple website and build a system that actually handles bookings, delivery tracking, feedback management, and automated email notifications.

This project demonstrates a practical workflow where different roles — customers, administrators, and delivery staff — interact with the system to complete their tasks efficiently. It reflects how a real-world service business could operate using modern web technologies.

The application follows a client-server architecture where the frontend communicates with backend APIs to perform operations and manage data.

---

## Project Overview

The platform allows customers to browse services, place bookings, track their orders, and receive email notifications automatically. Administrators can monitor bookings, manage menu items, review feedback, and oversee delivery operations from a centralized dashboard. Delivery staff can update delivery status in real time to keep customers informed.

The main objective of this project was to build a functional service management system that demonstrates backend logic, API handling, user role management, and full-stack development skills.

---

## Key Features

### User Features

- User registration and login system  
- Browse available catering services  
- Place catering bookings  
- Request delivery services  
- Real-time order tracking  
- View order history  
- Submit feedback and ratings  
- Manage user profile  
- Receive automatic email confirmations  

### Admin Features

- Secure admin authentication  
- Dashboard for monitoring activity  
- Booking management system  
- Payment tracking  
- Feedback management  
- Menu management (add, edit, delete items)  
- Delivery monitoring  
- Email notification system  

### Delivery Staff Features

The delivery workflow is structured in stages:

Order Accepted  
→ Packed  
→ Out for Delivery  
→ Delivered  

Delivery staff can access their dashboard, update delivery status, and manage assigned orders while automatically notifying customers about progress.

---

## Email Notification System

This system includes automated email functionality using SMTP through Nodemailer. Emails are triggered during important events such as booking confirmation, order status updates, delivery completion, admin notifications, and feedback confirmation. This feature simulates real business communication with customers.

---

## System Architecture

Frontend (React)  
↓  
Backend (Node.js / Express)  
↓  
SMTP Email Service (Nodemailer)  
↓  
Local JSON Storage  

The frontend sends HTTP requests to backend APIs, and the backend processes those requests before returning responses to the user interface.

---

## Technology Stack

### Frontend

- React.js  
- React Router  
- Framer Motion  
- Vite  
- CSS  

### Backend

- Node.js  
- Express.js  
- Nodemailer (SMTP Email Service)  
- Multer (File Upload Handling)  
- CORS  

### Database

- Local JSON Storage  
- Browser Local Storage  

This lightweight storage setup makes the system easy to run locally without external database configuration.

### Development Tools

- Visual Studio Code  
- Git  
- GitHub  
- Postman  

---

## Project Structure
```
karavali-caterers/
│
├── node_modules/              (root dependencies)
│
├── server/
│   ├── data/
│   ├── node_modules/
│   ├── uploads/
│   ├── config.js
│   ├── index.js
│   ├── package-lock.json
│   └── package.json
│
├── user/
│   ├── dist/
│   ├── node_modules/
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   │   ├── bg-video.mp4
│   │   │   ├── logo.png
│   │   │   └── react.svg
│   │   │
│   │   ├── Components/
│   │   │   └── FoodQuizData.js
│   │   │
│   │   ├── Data/
│   │   │   └── services.json
│   │   │
│   │   ├── Pages/
│   │   │   ├── About.jsx
│   │   │   ├── Admin.jsx
│   │   │   ├── BookingPage.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Delivery.jsx
│   │   │   ├── DeliveryDashboard.jsx
│   │   │   ├── Feedback.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── MyOrders.jsx
│   │   │   ├── PaymentPage.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── ServiceDetails.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── TrackingPage.jsx
│   │   │
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   └── vite.config.js
├── .gitignore
├── package-lock.json
└── package.json
└── README.md
```

The project is divided into two main modules:

Server — handles backend logic, APIs, and data processing  
User — handles frontend interface and user interaction  

---

## Installation Guide

Step 1 — Clone the repository

git clone https://github.com/your-username/karavali-caterers.git  
cd karavali-caterers  

Step 2 — Install backend dependencies

cd server  
npm install  

Step 3 — Install frontend dependencies

cd user  
npm install  

Step 4 — Start backend server

npm start  

The backend server will run on:

http://localhost:5000  

Step 5 — Start frontend

npm run dev  

The frontend application will run on:

http://localhost:5173  

---

## Default System Roles

Admin Account:

admin@gmail.com  

Delivery Account:

delivery@gmail.com  

These roles are used to access the Admin Dashboard and Delivery Dashboard.

---

## API Endpoints Overview

User APIs

POST /api/register  
POST /api/login  
GET /api/user/orders  

Booking APIs

POST /api/book  
GET /api/booking/:id  

Delivery APIs

POST /api/delivery/order  
GET /api/delivery/orders  
PATCH /api/delivery/status/:id  

Admin APIs

GET /api/admin/bookings  
GET /api/admin/feedbacks  
GET /api/admin/deliveries  

Feedback API

POST /api/feedback  

Service APIs

GET /api/services  
POST /api/admin/menu/:slug  
PUT /api/admin/menu/:slug/:index  
DELETE /api/admin/menu/:slug/:index  

---

## Data Storage Strategy

The system currently uses local JSON files, server memory, and browser local storage to manage data. This design keeps the project simple to set up and run locally while still demonstrating backend functionality.

---

## Security Implementation

Basic security practices implemented in the system include input validation, role-based access control, protected routes, error handling, email notification integration, and file upload size restrictions.

---

## Current Limitations

This project is built for development and portfolio purposes, so some production-level features are intentionally not included yet.

Known limitations include:

- Data resets when the server restarts  
- No cloud database persistence  
- No payment gateway integration  
- No production authentication tokens  

These limitations are normal for prototype and portfolio-level systems.

---

## Future Improvements

Planned improvements for future versions of the project include:

- MongoDB database integration  
- JWT authentication system  
- Online payment gateway integration  
- Cloud deployment  
- Push notification support  
- Advanced admin analytics dashboard  
- Improved mobile responsiveness  

---

## Deployment Plan

Frontend Deployment:

Vercel  

Backend Deployment:

Render  

---

## Author

Kiran Poojary  
Student Developer  
Full-Stack Web Application Project  

---

## Project Category

Portfolio Project  
Academic Project  

---

## License

This project is developed for educational and portfolio demonstration purposes.
