import { useEffect, useState, useCallback } from "react";
import bgVideo from "../assets/bg-video.mp4";

const DeliveryDashboard = () => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState("");

  /* DELIVERY FLOW */

  const acceptOrder = async (id) => {

  setActionLoading(id);

  try {

    await fetch(
      `http://localhost:5000/api/delivery/status/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          status: "accepted"
        })
      }
    );

    await loadOrders();

  } catch {

    alert("Failed");

  } finally {

    setActionLoading(null);

  }

};



  /* GET USER EMAIL */

  const getUserEmail = () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("loggedInUser")
      );
      return user?.email || "";
    } catch {
      return "";
    }
  };

  /* LOAD ORDERS — FIXED WITH useCallback */

  const loadOrders = useCallback(async () => {

    try {

      const email = getUserEmail();

      const res = await fetch(
        `http://localhost:5000/api/delivery/orders?email=${encodeURIComponent(email)}`
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Access denied"
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
    }, 10000);

    return () => clearInterval(interval);

  }, [loadOrders]);


  /* STATUS COLOR */

  const getStatusColor = (status) => {

    if (status === "pending")
      return "#f59e0b";

    if (status === "accepted")
      return "#3b82f6";

    if (status === "packed")
      return "#9333ea";

    if (status === "out_for_delivery")
      return "#0ea5e9";

    if (status === "delivered")
      return "#22c55e";

    return "#6b7280";

  };

  return (

    <div
      style={{
        position: "relative",
        minHeight: "100vh"
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

      <div
        className="container"
        style={{
          paddingTop: "30px",
          paddingBottom: "40px"
        }}
      >

        <h1
          style={{
            color: "#fff",
            textAlign: "center",
            marginBottom: "24px"
          }}
        >
          🚚 Delivery Dashboard
        </h1>

        {loading && (
          <h2 style={{ color: "#fff", textAlign: "center" }}>
            Loading orders...
          </h2>
        )}

        {error && (
          <h2 style={{ color: "red", textAlign: "center" }}>
            {error}
          </h2>
        )}

        {orders.length === 0 && !loading && (
          <p style={{ color: "#fff", textAlign: "center" }}>
            No delivery orders yet
          </p>
        )}

        {orders.map((o) => (

          <div
            key={o.id}
            style={{
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(12px)",
              padding: "20px",
              borderRadius: "16px",
              marginBottom: "18px",
              boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
              color: "#fff"
            }}
          >

            <h3>
              {o.customer?.name}
            </h3>

            <p>
              📞 {o.customer?.phone}
            </p>

            <p>
              📍 {o.customer?.address}
            </p>

            <p>
              🍽 Items:
              <br />
              {o.items?.join(", ")}
            </p>

            <p>
              🕒 Ordered:
              <br />
              {new Date(
                o.createdAt
              ).toLocaleString()}
            </p>

            <p
              style={{
                fontWeight: "bold",
                color: getStatusColor(
                  o.status
                ),
                marginTop: "10px"
              }}
            >
              Status: {o.status}
            </p>

            {o.status === "pending" && (

  <button
    onClick={() =>
      acceptOrder(o.id)
    }
    disabled={
      actionLoading === o.id
    }
    style={{
      marginTop: "10px",
      background: "#2563eb",
      color: "#fff",
      border: "none",
      padding: "10px 18px",
      borderRadius: "10px",
      fontWeight: "600",
      cursor: "pointer"
    }}
  >
    {actionLoading === o.id
      ? "Accepting..."
      : "Accept Order"}
  </button>

)}

          </div>

        ))}

      </div>

    </div>

  );

};

export default DeliveryDashboard;