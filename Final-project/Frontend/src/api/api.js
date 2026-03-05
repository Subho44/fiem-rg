import axios from "axios";

// Base URL from .env
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5600";

// Axios instance
const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

/* =========================
   JOB APIs
========================= */

// Get all jobs
export const getJobs = () => api.get("/jobs");

// Get single job
export const getJobbyid = (id) => api.get(`/jobs/${id}`);

// Delete job
export const deleteJobbyid = (id) => api.delete(`/jobs/${id}`);

// Create job (with image upload)
export const createjob = (formdata) =>
  api.post("/jobs", formdata, {
    headers: { "Content-Type": "multipart/form-data" },
  });

/* =========================
   PAYMENT APIs (RAZORPAY)
========================= */

// Create Razorpay order
export const createOrder = (data) =>
  api.post("/payments/create-order", data);

// Verify payment
export const verifyPayment = (data) =>
  api.post("/payments/verify", data);

/* =========================
   IMAGE URL HELPER
========================= */

export const getimageurl = (imgpath) => `${BASE_URL}${imgpath}`;

export default api;