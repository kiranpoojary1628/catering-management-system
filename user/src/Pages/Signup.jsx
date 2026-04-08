import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMsg({ type: "", text: "" });
  };

  const handleSignup = async () => {
    if (loading) return;

    const { name, email, password } = form;

    if (!name || !email || !password) {
      setMsg({ type: "error", text: "All fields are required" });
      return;
    }

    /* LOCAL STORAGE (mock auth) */
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some((u) => u.email === email)) {
      setMsg({ type: "error", text: "User already exists" });
      return;
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    setLoading(true);

    /* 🔔 SEND ADMIN EMAIL (NON-BLOCKING) */
    try {
      await fetch("http://localhost:5000/api/register", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
        }),
      });
    } catch (err) {
      console.warn("Admin email failed, signup still successful",err);
    }

    setMsg({
      type: "success",
      text: "Account created successfully!",
    });

    setTimeout(() => {
      navigate("/login");
    }, 1200);
  };

  return (
    <motion.div
      className="auth"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2>Create Account</h2>

      {msg.text && <p className={msg.type}>{msg.text}</p>}

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
      />

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

      <button onClick={handleSignup} disabled={loading}>
        {loading ? "Creating..." : "Sign Up"}
      </button>
    </motion.div>
  );
};

export default Signup;