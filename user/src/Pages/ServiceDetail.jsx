import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ServiceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);

  /* 🔥 FETCH FROM BACKEND */
  useEffect(() => {
    fetch("http://localhost:5000/api/services")
      .then(res => res.json())
      .then(data => {
        const found = data.find((s) => s.slug === slug);
        setService(found);
      })
      .catch(err => console.error(err));
  }, [slug]);

  if (!service) {
    return (
      <div className="container">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#ffffff",
        color: "#000000",
        minHeight: "100vh",
        paddingBottom: "60px",
      }}
    >
      {/* HERO SECTION */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "60px auto",
          padding: "20px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "40px",
          alignItems: "center",
        }}
      >
        {/* LEFT */}
        <div>
          <h1 style={{ fontSize: "40px", marginBottom: "12px" }}>
            {service.title}
          </h1>

          <p
            style={{
              fontSize: "1rem",
              color: "#3f3f3f",
              marginBottom: "16px",
            }}
          >
            {service.tagline}
          </p>

          <p style={{ lineHeight: "1.8", color: "#555" }}>
            {service.description}
          </p>

          <p style={{ marginTop: "16px", fontWeight: "600" }}>
            Starting from {service.price}
          </p>

          <button
            onClick={() => navigate(`/book/${service.slug}`)}
            style={{
              marginTop: "20px",
              padding: "12px 20px",
              background: "#000",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Book / Enquire Now
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <img
          src={
            service.image
              ? `http://localhost:5000${service.image}` // ✅ FIXED
              : "https://via.placeholder.com/400?text=No+Image"
          }
          alt={service.title}
          style={{
            width: "100%",
            borderRadius: "12px",
            objectFit: "cover",
          }}
        />
      </div>

      {/* MENU SECTION */}
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        <h2>Our Menu</h2>

        <ul style={{ paddingLeft: "20px", marginTop: "16px" }}>
          {(service.menu || []).map((item, index) => (
            <li
              key={index}
              style={{ marginBottom: "8px", color: "#333" }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ServiceDetail;