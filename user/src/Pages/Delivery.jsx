import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgVideo from "../assets/bg-video.mp4";

const Delivery = () => {

  const navigate = useNavigate();

  const [items, setItems] = useState("");

  const getUser = () => {
  try {
    return JSON.parse(
      localStorage.getItem("loggedInUser")
    );
  } catch {
    return null;
  }
};

const user = getUser();

const [form, setForm] = useState({
  name: user?.name || "",
  phone: "",
  email: user?.email
    ?.toLowerCase()
    .trim() || "",
  address: "",
});

  const [loading, setLoading] = useState(false);

  const [msg, setMsg] = useState({
    type: "",
    text: "",
  });

  /* HANDLE INPUT */

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setMsg({
      type: "",
      text: "",
    });

  };

  /* VALIDATION */

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const isValidPhone = (phone) => {
    return /^[6-9]\d{9}$/.test(phone);
  };

  /* SUBMIT ORDER */

  const handleSubmit = async () => {

    if (loading) return;

    if (!items.trim()) {
      setMsg({
        type: "error",
        text: "Enter at least one item",
      });
      return;
    }

    if (
      !form.name ||
      !form.phone ||
      !form.email ||
      !form.address
    ) {
      setMsg({
        type: "error",
        text: "Fill all fields",
      });
      return;
    }

    if (!isValidEmail(form.email)) {
      setMsg({
        type: "error",
        text: "Enter valid email address",
      });
      return;
    }

    if (!isValidPhone(form.phone)) {
      setMsg({
        type: "error",
        text: "Enter valid 10-digit phone number",
      });
      return;
    }

    setLoading(true);

    try {

      const res = await fetch(
        "http://localhost:5000/api/delivery/order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: items
              .split(",")
              .map((i) => i.trim())
              .filter(Boolean),
            customer: form,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Order failed"
        );
      }

      setMsg({
        type: "success",
        text: `Order placed successfully! Order ID: ${data.orderId}`,
      });

      /* RESET FORM */

      setItems("");

      setForm({
        name: "",
        phone: "",
        email: "",
        address: "",
      });

      /* AUTO NAVIGATE TO TRACKING */

      setTimeout(() => {
        navigate(`/tracking/${data.orderId}`);
      }, 2000);

    } catch (err) {

      setMsg({
        type: "error",
        text:
          err.message ||
          "Something went wrong",
      });

    } finally {

      setLoading(false);

    }

  };

  return (

    <div
      style={{
        position: "relative",
        minHeight: "100vh",
      }}
    >

      {/* VIDEO BACKGROUND */}

      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -2,
        }}
      >
        <source
          src={bgVideo}
          type="video/mp4"
        />
      </video>

      {/* OVERLAY */}

      <div
        style={{
          position: "fixed",
          inset: 0,
          background:
            "rgba(0,0,0,0.6)",
          zIndex: -1,
        }}
      />

      {/* CONTENT */}

      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "40px",
          paddingBottom: "40px",
        }}
      >

        <div
          style={{
            width: "100%",
            maxWidth: "520px",
            background:
              "rgba(255,255,255,0.12)",
            backdropFilter:
              "blur(12px)",
            borderRadius: "16px",
            padding: "28px",
            boxShadow:
              "0 12px 30px rgba(0,0,0,0.35)",
          }}
        >

          <h1
            style={{
              textAlign: "center",
              marginBottom: "18px",
              color: "#fff",
            }}
          >
            🚚 Home Delivery
          </h1>

          {/* MESSAGE */}

          {msg.text && (

            <p
              style={{
                color:
                  msg.type === "success"
                    ? "#065f46"
                    : "#b42318",

                background:
                  msg.type === "success"
                    ? "#d1fae5"
                    : "#fdecec",

                padding: "12px",
                borderRadius: "8px",
                marginBottom: "15px",
              }}
            >
              {msg.text}
            </p>

          )}

          <input
            placeholder="Items (example: Biryani, Chicken, Juice)"
            value={items}
            onChange={(e) =>
              setItems(e.target.value)
            }
            style={inputStyle}
          />

          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
  name="email"
  value={form.email}
  readOnly
  style={{
    ...inputStyle,
    background: "#e5e7eb",
    cursor: "not-allowed"
  }}
/>

          <textarea
            name="address"
            placeholder="Delivery Address"
            value={form.address}
            onChange={handleChange}
            style={{
              ...inputStyle,
              minHeight: "90px",
            }}
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={buttonStyle}
          >
            {loading
              ? "Placing Order..."
              : "Place Delivery Order"}
          </button>

        </div>

      </div>

    </div>

  );

};

const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  marginBottom: "12px",
  fontSize: "14px",
};

const buttonStyle = {
  width: "100%",
  background: "#22c55e",
  color: "#fff",
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  marginTop: "12px",
  fontWeight: "600",
  fontSize: "16px",
  cursor: "pointer",
  transition: "0.2s",
};

export default Delivery;