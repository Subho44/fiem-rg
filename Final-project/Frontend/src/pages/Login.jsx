import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const hc = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const hs = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5600/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      alert("Login successful ✅");
      navigate("/home");
      window.location.reload(); // so navbar updates instantly
    } catch (err) {
      alert(err?.response?.data?.error || "Login failed ❌");
    }
  };

  return (
    <form onSubmit={hs}>
      <input name="email" placeholder="email..." onChange={hc} />
      <br />
      <input name="password" type="password" placeholder="password..." onChange={hc} />
      <br />
      <button>Login</button>
    </form>
  );
};

export default Login;