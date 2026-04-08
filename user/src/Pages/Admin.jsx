import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";
import { useNavigate } from "react-router-dom";
import bgVideo from "../assets/bg-video.mp4";

const Admin = () => {

  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [deliveryOrders, setDeliveryOrders] = useState([]);

  // 🔥 NEW
  const [services, setServices] = useState([]);
  const [newItems, setNewItems] = useState({});
  const [files, setFiles] = useState({});

  const [search, setSearch] = useState("");
  const [range, setRange] = useState("week");

  const [adminEmail, setAdminEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");

  const user = JSON.parse(localStorage.getItem("loggedInUser") || "null");

  /* ADMIN CHECK */
  useEffect(() => {
    fetch("http://localhost:5000/api/admin/config")
      .then(res => res.json())
      .then(data => setAdminEmail(data.adminEmail))
      .catch(() => setError("Admin verification failed"));
  }, []);

  /* LOAD DATA */
  useEffect(() => {
    if (!adminEmail) return;

    const loadData = async () => {
  try {

    const b = await fetch(
      "http://localhost:5000/api/admin/bookings"
    ).then(r => r.json());

    const f = await fetch(
      "http://localhost:5000/api/admin/feedbacks"
    ).then(r => r.json());

    const s = await fetch(
      "http://localhost:5000/api/services"
    ).then(r => r.json());

    const d = await fetch(
      "http://localhost:5000/api/admin/deliveries"
    ).then(r => r.json());

    setBookings(b);
    setFeedbacks(f);
    setServices(s);
    setDeliveryOrders(d);

  } catch (err) {

    console.error(err);
    setError("Failed to load data");

  } finally {

    setLoading(false);

  }
};

    loadData();
  }, [adminEmail]);

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  /* ================= MENU ================= */

  const reloadServices = async () => {
    const s = await fetch("http://localhost:5000/api/services").then(r => r.json());
    setServices(s);
  };

  const addItem = async (slug) => {
  const item = newItems[slug];
  const file = files[slug];

  if (!item?.name) {
    alert("Enter item name");
    return;
  }

  const formData = new FormData();
  formData.append("name", item.name);

  if (file) {
    formData.append("image", file);
  }

  await fetch(`http://localhost:5000/api/admin/menu/${slug}`, {
    method: "POST",
    body: formData
  });

  await reloadServices();

  setNewItems(prev => ({
    ...prev,
    [slug]: { name: "" }
  }));

  setFiles(prev => ({
    ...prev,
    [slug]: null
  }));
};

  const deleteItem = async (slug, index) => {
    await fetch(`http://localhost:5000/api/admin/menu/${slug}/${index}`, {
      method: "DELETE"
    });
    reloadServices();
  };

  const editItem = async (slug, index) => {
  const name = prompt("Enter new name (leave blank to keep same):");

  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.click();

  fileInput.onchange = async () => {
    const file = fileInput.files[0];

    const formData = new FormData();

    if (name) formData.append("name", name);
    if (file) formData.append("image", file);

    await fetch(`http://localhost:5000/api/admin/menu/${slug}/${index}`, {
      method: "PUT",
      body: formData
    });

    reloadServices();
  };
};

  /* ================= BOOKINGS (UNCHANGED) ================= */

  const confirmBooking = async (id) => {
    await fetch(`http://localhost:5000/api/admin/bookings/${id}`, {
      method: "PATCH"
    });

    setBookings(prev =>
      prev.map(b =>
        b.id === id ? { ...b, status: "confirmed" } : b
      )
    );
  };

  const cancelBooking = async (id) => {
    await fetch(`http://localhost:5000/api/admin/bookings/${id}`, {
      method: "DELETE"
    });

    setBookings(prev => prev.filter(b => b.id !== id));
  };

  const filtered = bookings.filter(b =>
    b.customer?.name?.toLowerCase().includes(search.toLowerCase())
  );

  /* CHART (UNCHANGED) */
  const getChartData = () => {
    const create = (labels) => labels.map(l => ({ name: l, count: 0 }));

    if (range === "week") {
      const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
      const data = create(days);

      bookings.forEach(b => {
        const d = new Date(b.createdAt);
        data[d.getDay()].count++;
      });

      return data;
    }

    if (range === "month") {
      const data = create(["W1","W2","W3","W4"]);

      bookings.forEach(b => {
        const d = new Date(b.createdAt);
        const week = Math.floor((d.getDate()-1)/7);
        if (data[week]) data[week].count++;
      });

      return data;
    }

    if (range === "year") {
      const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      const data = create(months);

      bookings.forEach(b => {
        const d = new Date(b.createdAt);
        data[d.getMonth()].count++;
      });

      return data;
    }
  };

  const chartData = getChartData();

  const revenue = bookings.reduce((t, b) => t + (b.amount || 0), 0);
  const confirmed = bookings.filter(b => b.status === "confirmed").length;
  const pending = bookings.filter(b => b.status === "pending").length;
  const paid = bookings.filter(b => b.paymentStatus === "paid").length;

  if (loading) return <h2 style={{ color: "white" }}>Loading...</h2>;
  if (error) return <h2 style={{ color: "white" }}>{error}</h2>;

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>

      <video autoPlay muted loop className="bg-video">
  <source src={bgVideo} type="video/mp4" />
</video>
      <div className="overlay" />

      <div className="admin-navbar">
        <h2>Admin Panel</h2>
        <div className="admin-nav-right">
          <span>{user?.email}</span>
          <button onClick={logout}>Logout</button>
        </div>
      </div>

      <div className="admin-layout">

        {/* SIDEBAR */}
        <div className="sidebar">
          <ul>
            <li onClick={()=>setActiveTab("dashboard")}>Dashboard</li>
            <li onClick={()=>setActiveTab("bookings")}>Bookings</li>
            <li onClick={()=>setActiveTab("payments")}>Payments</li>
            <li onClick={()=>setActiveTab("feedback")}>Feedback</li>
            <li onClick={()=>setActiveTab("menu")}>Menu</li> {/* 🔥 NEW */}
            <li onClick={() =>setActiveTab("deliveries")}>Deliveries</li>
          </ul>
        </div>

        <div className="main-content">
          <div className="admin-panel">

            {/* 🔥 MENU TAB */}
            {activeTab === "menu" && (
  <>
    <h1 style={{ marginBottom: "20px" }}>🍽️ Menu Manager</h1>

    {services.map(service => (
      <div key={service.slug} style={{
        marginBottom: "30px",
        padding: "20px",
        borderRadius: "16px",
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(10px)"
      }}>

        <h2 style={{ marginBottom: "15px" }}>{service.title}</h2>

        {/* ITEMS GRID */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "15px"
        }}>

          {service.menu.map((item, i) => (
            <div key={i} style={{
              background: "#fff",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
            }}>

              <img
  src={
    item.image
      ? `http://localhost:5000${item.image}`
      : "https://via.placeholder.com/150"
  }
  onError={(e) => {
    e.target.src = "https://via.placeholder.com/150";
  }}
  style={{ width: "100%", height: "120px", objectFit: "cover" }}
/>

              <div className="card-content">
                <b style={{ display: "block", marginBottom: "8px" }}>
                  {item.name}
                </b>

                <div style={{ display: "flex", gap: "6px" }}>
                  <button
                    onClick={() => editItem(service.slug, i)}
                    style={{
                      flex: 1,
                      background: "#3b82f6",
                      color: "#fff",
                      border: "none",
                      padding: "6px",
                      borderRadius: "6px"
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteItem(service.slug, i)}
                    style={{
                      flex: 1,
                      background: "#ef4444",
                      color: "#fff",
                      border: "none",
                      padding: "6px",
                      borderRadius: "6px"
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>

            </div>
          ))}

        </div>

        {/* ADD NEW ITEM */}
        <div style={{
          marginTop: "20px",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap"
        }}>

          <input
            placeholder="Item name"
            value={newItems[service.slug]?.name || ""}
onChange={(e)=>
  setNewItems(prev => ({
    ...prev,
    [service.slug]: {
      name: e.target.value
    }
  }))
}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "none",
              flex: "1"
            }}
          />

          <input
            type="file"
            onChange={(e)=>
  setFiles(prev => ({
    ...prev,
    [service.slug]: e.target.files[0]
  }))
}
            style={{
              background: "#fff",
              padding: "8px",
              borderRadius: "8px"
            }}
          />

          <button
            onClick={()=>addItem(service.slug)}
            style={{
              background: "#22c55e",
              color: "#fff",
              border: "none",
              padding: "10px 16px",
              borderRadius: "8px"
            }}
          >
            ➕ Add Item
          </button>

        </div>

      </div>
    ))}
  </>
)}

            {/* ===== YOUR ORIGINAL UI BELOW (UNCHANGED) ===== */}

            {activeTab === "dashboard" && (
                          <>
                            <h1>Dashboard</h1>
            
                            <div className="admin-stats">
                              <div className="stat-card">Total<br />{bookings.length}</div>
                              <div className="stat-card">Pending<br />{pending}</div>
                              <div className="stat-card">Confirmed<br />{confirmed}</div>
                              <div className="stat-card">Paid<br />{paid}</div>
                              <div className="stat-card">Revenue<br />₹ {revenue}</div>
                            </div>
            
                            <div style={{background:"#fff",padding:"20px",borderRadius:"12px",marginTop:"20px"}}>
                              <div style={{display:"flex",justifyContent:"space-between"}}>
                                <h3>Orders Overview</h3>
            
                                <select value={range} onChange={(e)=>setRange(e.target.value)}>
                                  <option value="week">Week</option>
                                  <option value="month">Month</option>
                                  <option value="year">Year</option>
                                </select>
                              </div>
            
                              <ResponsiveContainer width="100%" height={320}>
                                <BarChart data={chartData}>
                                  <XAxis dataKey="name" />
                                  <YAxis allowDecimals={false} />
                                  <Tooltip />
                                  <Bar dataKey="count" fill="#3b82f6" radius={[6,6,0,0]} />
                                </BarChart>
                              </ResponsiveContainer>
                            </div>
                          </>
                        )}
            {activeTab === "bookings" && (
              <>
                <h1>Bookings</h1>

                <input
                  placeholder="Search..."
                  value={search}
                  onChange={(e)=>setSearch(e.target.value)}
                />

                {filtered.map(b => (
                  <div key={b.id} className="booking-card">

                    <p>
                      <b>{b.customer.name}</b> - {b.service}<br />
                      Status: {b.status}
                    </p>

                    <div style={{display:"flex",gap:"10px"}}>
                      {b.status !== "confirmed" && (
                        <button onClick={()=>confirmBooking(b.id)} style={{background:"green",color:"#fff"}}>
                          Confirm
                        </button>
                      )}

                      <button onClick={()=>cancelBooking(b.id)} style={{background:"red",color:"#fff"}}>
                        Cancel
                      </button>
                    </div>

                  </div>
                ))}
              </>
            )}
            {activeTab === "payments" && (
              <>
                <h1>Payments</h1>

                {bookings.map(b => (
                  <div key={b.id} className="booking-card">

                    <div style={{ lineHeight: "1.6" }}>
                      <b>{b.customer?.name}</b><br />
                      Amount: ₹{b.amount}<br />
                      Status: {b.paymentStatus}
                    </div>

                    <div style={{ marginTop: "10px", fontSize: "14px", opacity: 0.8 }}>
                      Method: {b.paymentMethod || "UPI"}<br />
                      UPI ID: {b.upiId || "—"}<br />
                      Transaction ID: {b.txnId || "—"}
                    </div>

                  </div>
                ))}
              </>
            )}
            {activeTab === "feedback" && (
  <>
    <h1>Feedback</h1>

    {feedbacks.length === 0 ? (
      <p style={{ opacity: 0.7 }}>No feedback yet</p>
    ) : (
      feedbacks.map(f => (
        <div key={f.id} className="booking-card" style={{ marginBottom: "12px" }}>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <b>{f.name}</b>

            {/* ⭐ RATING */}
            <span>
              {"⭐".repeat(f.rating || 5)}
            </span>
          </div>

          <p style={{ marginTop: "8px" }}>
            {f.message}
          </p>

          {/* DATE */}
          <small style={{ opacity: 0.6 }}>
            {new Date(f.createdAt).toLocaleString()}
          </small>

        </div>
      ))
    )}
  </>
)}
            {activeTab === "deliveries" && (

  <>
    <h1>
      🚚 Delivery Orders
    </h1>

    {deliveryOrders.length === 0 && (
      <p>
        No delivery orders yet
      </p>
    )}

    {deliveryOrders.map(o => (

      <div
        key={o.id}
        style={{
          background: "#fff",
          padding: "16px",
          borderRadius: "12px",
          marginBottom: "16px",
          boxShadow:
            "0 4px 10px rgba(0,0,0,0.1)"
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
          <br/>
          {o.items?.join(", ")}
        </p>

        <p>
          🕒 Ordered:
          <br/>
          {new Date(
            o.createdAt
          ).toLocaleString()}
        </p>

        <p
          style={{
            fontWeight: "bold",
            marginTop: "8px",
            color:
              o.status === "pending"
                ? "#f59e0b"
                : o.status === "accepted"
                ? "#3b82f6"
                : o.status === "packed"
                ? "#9333ea"
                : o.status === "out_for_delivery"
                ? "#0ea5e9"
                : o.status === "delivered"
                ? "#22c55e"
                : "#6b7280"
          }}
        >
          Status: {o.status}
        </p>

      </div>

    ))}

  </>

)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;