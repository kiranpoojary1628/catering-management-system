import { useState } from "react";
import bgVideo from "../assets/bg-video.mp4";

const Feedback = () => {

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitFeedback = async () => {
    if (!name || !message) return;

    setLoading(true);

    try {
      await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, message, rating })
      });

      // ✅ show success UI instead of alert
      setSubmitted(true);

      // reset form
      setName("");
      setMessage("");
      setRating(5);

    } catch {
      console.error("Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>

      {/* BG VIDEO */}
      <video autoPlay muted loop className="bg-video">
        <source src={bgVideo} type="video/mp4" />
      </video>

      <div className="overlay" />

      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        position: "relative",
        zIndex: 2
      }}>

        <div style={{
          width: "400px",
          padding: "30px",
          borderRadius: "16px",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          color: "white",
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)"
        }}>

          {/* 🔥 SUCCESS MESSAGE */}
          {submitted && (
            <div style={{
              background: "#22c55e",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "15px",
              textAlign: "center"
            }}>
              ✅ Feedback submitted successfully!
            </div>
          )}

          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            Give Feedback
          </h2>

          <input
            placeholder="Your Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            style={inputStyle}
          />

          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
            style={{ ...inputStyle, minHeight: "100px" }}
          />

          <select
            value={rating}
            onChange={(e)=>setRating(e.target.value)}
            style={inputStyle}
          >
            <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
            <option value="4">⭐⭐⭐⭐ Good</option>
            <option value="3">⭐⭐⭐ Average</option>
            <option value="2">⭐⭐ Poor</option>
            <option value="1">⭐ Bad</option>
          </select>

          <button
            onClick={submitFeedback}
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              background: loading ? "#555" : "#22c55e",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
              marginTop: "10px"
            }}
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>

        </div>
      </div>
    </div>
  );
};

/* 🔥 REUSABLE STYLE */
const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "12px",
  borderRadius: "8px",
  border: "none",
  outline: "none"
};

export default Feedback;