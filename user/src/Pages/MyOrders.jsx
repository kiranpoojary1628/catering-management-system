import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import bgVideo from "../assets/bg-video.mp4";

const MyOrders = () => {

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* GET USER EMAIL */

  const getUserEmail = () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("loggedInUser")
      );

      return user?.email
  ?.toLowerCase()
  .trim() || "";

    } catch {
      return "";
    }
  };

  /* LOAD ORDERS */

  const loadOrders = useCallback(async () => {

    try {

      const email = getUserEmail();

      const res = await fetch(
        `http://localhost:5000/api/user/orders?email=${encodeURIComponent(email)}`
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to load orders"
        );
      }

      setOrders(data);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }

  }, []);

  /* AUTO REFRESH */

  useEffect(() => {

    loadOrders();

    const interval = setInterval(() => {
      loadOrders();
    }, 5000);

    return () => clearInterval(interval);

  }, [loadOrders]);

  return (

    <div
      style={{
        position: "relative",
        minHeight: "100vh"
      }}
    >

      {/* VIDEO */}

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
          zIndex: -2
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
          background: "rgba(0,0,0,0.6)",
          zIndex: -1
        }}
      />

      <div className="container">

        <h1 style={{ color: "#fff" }}>
          📦 My Orders
        </h1>

        {loading && (
          <p style={{ color: "#fff" }}>
            Loading orders...
          </p>
        )}

        {error && (
          <p style={{ color: "red" }}>
            {error}
          </p>
        )}

        {orders.length === 0 && !loading && (
          <p style={{ color: "#fff" }}>
            No orders yet
          </p>
        )}

        {orders.map(o => (

          <div
            key={o.id}
            style={{
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(10px)",
              padding: "16px",
              borderRadius: "12px",
              marginBottom: "16px",
              color: "#fff"
            }}
          >

            <h3>
              {o.service || "Home Delivery"}
            </h3>

            <p>
              Status:
              {" "}
              <b>
                {o.status}
              </b>
            </p>

            <p>
              Ordered:
              <br />
              {new Date(
                o.createdAt
              ).toLocaleString()}
            </p>

            <button
              onClick={() =>
                navigate(
                  `/tracking/${o.id}`
                )
              }
              style={{
                marginTop: "10px",
                background: "#3b82f6",
                color: "#fff",
                border: "none",
                padding: "8px 14px",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              Track Order
            </button>

          </div>

        ))}

      </div>

    </div>

  );

};

export default MyOrders;