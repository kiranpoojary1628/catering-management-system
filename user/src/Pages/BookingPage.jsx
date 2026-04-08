import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import bgVideo from "../assets/bg-video.mp4";

const BookingPage = () => {

  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [service, setService] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    message: "",
  });

  const [msg, setMsg] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  /* 🔥 LOAD SERVICES */
  useEffect(() => {
    fetch("http://localhost:5000/api/services")
      .then(res => res.json())
      .then(data => {
        const found = data.find(s => s.slug === slug);
        setService(found);

        if (found?.menu) {
          setSelectedItems(found.menu.slice(0, 3));
        }
      })
      .catch(() => setMsg({ type: "error", text: "Failed to load services" }));
  }, [slug]);

  const successMessage = location.state?.success
    ? {
        type: "success",
        text: "✅ Payment successful! We will contact you soon.",
      }
    : null;

  if (!service) {
    return (
      <div className="container">
        <h2 style={{ color: "white" }}>Loading...</h2>
      </div>
    );
  }

  const toggleItem = (item) => {
    setSelectedItems((prev) =>
      prev.some((i) => i.name === item.name)
        ? prev.filter((i) => i.name !== item.name)
        : [...prev, item]
    );
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMsg({ type: "", text: "" });
  };

  const handleSubmit = async () => {

    if (loading) return;

    if (!form.name || !form.phone || !form.email) {
      setMsg({ type: "error", text: "Please fill name, phone and email" });
      return;
    }

    if (selectedItems.length === 0) {
      setMsg({ type: "error", text: "Select at least one item" });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          service: service.title,
          items: selectedItems.map(i => i.name),
          customer: form,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.bookingId) {
        setMsg({ type: "error", text: data.message || "Booking failed" });
        setLoading(false);
        return;
      }

      navigate(`/payment/${data.bookingId}`, { state: { slug } });

    } catch (err) {
      setMsg({ type: "error", text: err.message });
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>

      {/* VIDEO BG */}
      <video autoPlay muted loop playsInline style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        zIndex: -2,
      }}>
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* OVERLAY */}
      <div style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        zIndex: -1,
      }} />

      <div className="container">

        <h1>{service.title} – Booking</h1>
        <p className="booking-tagline">{service.tagline}</p>

        {/* MENU */}
        <h2 style={{ marginTop: 40 }}>Select Menu Items</h2>

        <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "20px"
  }}
>
          {(service.menu || []).map((item, index) => {
            const isSelected = selectedItems.some(i => i.name === item.name);

            return (
              <div
                key={index}
                className="card"
                onClick={() => toggleItem(item)}
                style={{
                  cursor: "pointer",
                  border: isSelected ? "2px solid #22c55e" : "2px solid transparent",
                  transform: isSelected ? "scale(1.03)" : "scale(1)",
                  transition: "0.2s",
                  overflow: "hidden",           // ✅ FIX
                  borderRadius: "12px"
                }}
              >

                {/* 🔥 IMAGE FIX */}
                <img
                  src={
                    item.image
                      ? `http://localhost:5000${item.image}`
                      : "https://via.placeholder.com/300?text=No+Image"
                  }
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "160px",            // ✅ FIXED HEIGHT
                    objectFit: "cover",         // ✅ NO STRETCH
                    display: "block"
                  }}
                  onError={(e)=>{
                    e.target.src="https://via.placeholder.com/300?text=No+Image";
                  }}
                />

                <div className="card-content">
                  <h3>{item.name}</h3>

                  <p style={{
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    color: isSelected ? "#22c55e" : "#666",
                  }}>
                    {isSelected ? "✔ Selected" : "Click to add"}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

        {/* FORM */}
        <h2 style={{ marginTop: 50 }}>Your Details</h2>

        <div className="auth" style={{
          background: "rgba(255,255,255,0.1)",
          padding: 20,
          borderRadius: 12,
          backdropFilter: "blur(10px)"
        }}>

          {(successMessage || msg.text) && (
            <p style={{
              color: (successMessage || msg).type === "success" ? "#065f46" : "#b42318",
              background: (successMessage || msg).type === "success" ? "#d1fae5" : "#fdecec",
              padding: 12,
              borderRadius: 8,
            }}>
              {(successMessage || msg).text}
            </p>
          )}

          <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} />
          <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} />
          <input name="email" placeholder="Email Address" value={form.email} onChange={handleChange} />
          <input type="date" name="date" value={form.date} onChange={handleChange} />
          <textarea name="message" placeholder="Additional requirements" value={form.message} onChange={handleChange} />

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              background: "#2563eb",
              color: "#fff",
              padding: 12,
              borderRadius: 8,
              border: "none",
              marginTop: 10
            }}
          >
            {loading ? "Processing..." : "Place Order"}
          </button>

        </div>

      </div>
    </div>
  );
};

export default BookingPage;