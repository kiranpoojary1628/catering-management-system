import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMsg({ type: "", text: "" });
  };

  const handleLogin = async () => {
    if (loading) return;
    setLoading(true);

    const { email, password } = form;

    if (!email || !password) {
      setMsg({ type: "error", text: "All fields are required" });
      setLoading(false);
      return;
    }

    /* LOCAL AUTH */
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      setMsg({ type: "error", text: "Invalid email or password" });
      setLoading(false);
      return;
    }

    /* SAVE SESSION */
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    sessionStorage.setItem("justLoggedIn", "true");

    /* 🔔 ADMIN EMAIL (FIXED HEADERS) */
    try {
      await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // ✅ IMPORTANT FIX
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
        }),
      });
    } catch (err) {
      console.warn("Admin login email failed",err);
    }

    setMsg({ type: "success", text: "Login successful!" });

    setTimeout(() => {
      navigate("/"); // or /admin if needed
    }, 600);
  };

  return (
    <motion.div
      className="auth"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2>Login</h2>

      {msg.text && <p className={msg.type}>{msg.text}</p>}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />

      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </motion.div>
  );
};

export default Login;