import { motion } from "framer-motion";

const DishModal = ({ dish, onClose }) => {
  if (!dish) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          background: "#fff",
          color: "#000",
          padding: "20px",
          borderRadius: "16px",
          width: "90%",
          maxWidth: "420px",
          maxHeight: "85vh",
          overflowY: "auto",
        }}
      >
        <img
          src={dish.image}
          alt={dish.title}
          style={{ width: "100%", borderRadius: "12px" }}
        />

        <h2 style={{ marginTop: "12px" }}>{dish.title}</h2>
        <p style={{ color: "#555" }}>{dish.tagline}</p>
        <p style={{ fontWeight: "bold" }}>{dish.price}</p>

        {/* ✅ ONLY Karavali SPECIAL SHOWS MENU */}
        {dish.showMenu && dish.menu && (
          <>
            <h3 style={{ marginTop: "14px" }}>Menu</h3>
            <ul style={{ paddingLeft: "18px", marginTop: "8px" }}>
              {dish.menu.map((item, index) => (
                <li key={index} style={{ marginBottom: "6px" }}>
                  {item}
                </li>
              ))}
            </ul>
          </>
        )}

        <button
          onClick={onClose}
          style={{
            marginTop: "14px",
            width: "100%",
            padding: "10px",
            background: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};

export default DishModal;