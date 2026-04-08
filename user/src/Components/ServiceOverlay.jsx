import { motion } from "framer-motion";

const ServiceOverlay = ({ service, onClose }) => {
  if (!service) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#fff",
        zIndex: 10000,
        overflowY: "auto",
      }}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          fontSize: "18px",
          background: "black",
          color: "white",
          border: "none",
          padding: "8px 14px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        ✕ Close
      </button>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          maxWidth: "900px",
          margin: "80px auto",
          padding: "20px",
        }}
      >
        <img
          src={service.image}
          alt={service.title}
          style={{
            width: "100%",
            borderRadius: "14px",
            marginBottom: "20px",
          }}
        />

        <h1>{service.title}</h1>
        <p style={{ color: "#666", marginBottom: "8px" }}>
          {service.tagline}
        </p>
        <p style={{ fontWeight: "600", marginBottom: "20px" }}>
          {service.price}
        </p>

        {/* MENU */}
        {service.menu && (
          <>
            <h2>Menu</h2>
            <ul style={{ paddingLeft: "20px" }}>
              {service.menu.map((item, index) => (
                <li key={index} style={{ marginBottom: "8px" }}>
                  {item}
                </li>
              ))}
            </ul>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default ServiceOverlay;