import { BrowserRouter, Routes, Route } from "react-router-dom";

/* 🔹 Components */
import Navbar from "./Components/Navbar";

/* 🔹 Pages */
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Profile from "./Pages/Profile";
import ServiceDetail from "./Pages/ServiceDetail";
import BookingPage from "./Pages/BookingPage";
import PaymentPage from "./Pages/PaymentPage";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Admin from "./Pages/Admin";
import Feedback from "./Pages/Feedback";
import Delivery from "./Pages/Delivery";
import DeliveryDashboard from "./Pages/DeliveryDashboard";
import ProtectedDelivery from "./Components/ProtectedDelivery";
import MyOrders from "./Pages/MyOrders";
import TrackingPage from "./Pages/TrackingPage";

const App = () => {
  return (
    <BrowserRouter>

      {/* 🔥 NAVBAR ALWAYS VISIBLE */}
      <Navbar />

      <Routes>

        {/* ========================
            MAIN
        ======================== */}
        <Route path="/" element={<Home />} />

        {/* ========================
            STATIC
        ======================== */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* ========================
            AUTH
        ======================== */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />

        {/* ========================
            SERVICES FLOW
        ======================== */}

        {/* View service */}
        <Route path="/service/:slug" element={<ServiceDetail />} />

        {/* Booking page */}
        <Route path="/book/:slug" element={<BookingPage />} />

        {/* Payment page (after booking) */}
        <Route path="/payment/:id" element={<PaymentPage />} />

        {/* ========================
            ADMIN
        ======================== */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/feedback" element={<Feedback />} />

        {/* ========================
            FALLBACK
        ======================== */}
        <Route path="*" element={<Home />} />


        <Route path="/delivery" element={<Delivery />} />
        <Route path="/delivery-dashboard"element={<ProtectedDelivery>
      <DeliveryDashboard />
    </ProtectedDelivery>} />
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/tracking/:id" element={<TrackingPage />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;