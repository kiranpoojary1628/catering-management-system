import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Profile = () => {

  const navigate = useNavigate();

  /* LOAD USER SAFELY */

  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("loggedInUser");
    return stored ? JSON.parse(stored) : null;
  });

  const [role, setRole] = useState("User");

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [msg, setMsg] = useState({
    type: "",
    text: "",
  });

  /* CHECK LOGIN + ROLE */

  useEffect(() => {

    if (!user) {
      navigate("/login");
      return;
    }

    const loadRole = async () => {

      try {

        const res = await fetch(
          "http://localhost:5000/api/admin/config"
        );

        const data = await res.json();

        const email =
          user.email
            ?.toLowerCase()
            .trim();

        if (
          email ===
          data.adminEmail
            ?.toLowerCase()
            .trim()
        ) {

          setRole("Admin");

        } else if (
          email ===
          data.deliveryEmail
            ?.toLowerCase()
            .trim()
        ) {

          setRole("Delivery Man");

        } else {

          setRole("User");

        }

      } catch {

        setRole("User");

      }

    };

    loadRole();

  }, [user, navigate]);

  /* INPUT CHANGE */

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

  /* CHANGE PASSWORD */

  const handleChangePassword = () => {

    const {
      oldPassword,
      newPassword,
      confirmPassword,
    } = form;

    if (
      !oldPassword ||
      !newPassword ||
      !confirmPassword
    ) {

      setMsg({
        type: "error",
        text: "All fields are required",
      });

      return;

    }

    if (
      oldPassword !== user.password
    ) {

      setMsg({
        type: "error",
        text: "Old password is incorrect",
      });

      return;

    }

    if (
      newPassword.length < 6
    ) {

      setMsg({
        type: "error",
        text:
          "New password must be at least 6 characters",
      });

      return;

    }

    if (
      newPassword !==
      confirmPassword
    ) {

      setMsg({
        type: "error",
        text: "Passwords do not match",
      });

      return;

    }

    const users =
      JSON.parse(
        localStorage.getItem("users")
      ) || [];

    const updatedUsers =
      users.map((u) =>
        u.email === user.email
          ? {
              ...u,
              password: newPassword,
            }
          : u
      );

    localStorage.setItem(
      "users",
      JSON.stringify(
        updatedUsers
      )
    );

    const updatedUser = {
      ...user,
      password: newPassword,
    };

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(
        updatedUser
      )
    );

    setUser(updatedUser);

    setForm({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setMsg({
      type: "success",
      text:
        "Password updated successfully",
    });

  };

  return (

    <motion.div
      className="auth"
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
      }}
    >

      {/* PROFILE HEADER */}

      <div
        style={{
          textAlign: "center",
          marginBottom: "16px",
        }}
      >

        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            background: "#000",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.4rem",
            margin:
              "0 auto 10px",
          }}
        >

          {user.name
            .charAt(0)
            .toUpperCase()}

        </div>

        <h2
          style={{
            marginBottom: "4px",
          }}
        >
          {user.name}
        </h2>

        <p
          style={{
            fontSize: "0.85rem",
            color: "#666",
          }}
        >
          {user.email}
        </p>

        {/* ROLE BADGE */}

        <div
          style={{
            marginTop: "8px",
            display: "inline-block",
            padding:
              "6px 12px",
            borderRadius:
              "999px",
            background:
              role === "Admin"
                ? "#16a34a"
                : role ===
                  "Delivery Man"
                ? "#2563eb"
                : "#6b7280",
            color: "#fff",
            fontSize: "12px",
            fontWeight: "600",
          }}
        >

          Role: {role}

        </div>

      </div>

      <hr
        style={{
          border: "none",
          borderTop:
            "1px solid #eee",
        }}
      />

      <h3
        style={{
          marginTop: "14px",
          marginBottom: "8px",
        }}
      >
        Security Settings
      </h3>

      {msg.text && (
        <p className={msg.type}>
          {msg.text}
        </p>
      )}

      <input
        type="password"
        name="oldPassword"
        placeholder="Current Password"
        value={form.oldPassword}
        onChange={handleChange}
      />

      <input
        type="password"
        name="newPassword"
        placeholder="New Password"
        value={form.newPassword}
        onChange={handleChange}
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm New Password"
        value={
          form.confirmPassword
        }
        onChange={handleChange}
      />

      <button
        onClick={
          handleChangePassword
        }
      >
        Update Password
      </button>

    </motion.div>

  );

};

export default Profile;