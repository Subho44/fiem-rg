import React, { useEffect, useMemo, useState } from "react";
import { Grid, Typography, TextField, Alert, Snackbar, Box } from "@mui/material";
import Loader from "../components/Loader.jsx";
import JobCard from "../components/Jobcard.jsx";
import api, { deleteJobbyid, getJobs } from "../api/api.js";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [snack, setSnack] = useState({ open: false, msg: "", type: "success" });
  const [msg, setMsg] = useState("");

  // ✅ Subscribe / Buy Now
  const hsp = async (job) => {
    try {
      setMsg("");

      // ✅ Basic job guard
      if (!job?._id) {
        setMsg("❌ Job id missing");
        return;
      }

      // ✅ Razorpay loaded?
      if (typeof window === "undefined" || !window.Razorpay) {
        setMsg("❌ Razorpay SDK not loaded. index.html এ checkout.js add করুন");
        setSnack({ open: true, msg: "Razorpay SDK not loaded ❌", type: "error" });
        return;
      }

      // ✅ Amount in paise (₹199)
      const amount = 19900;

      // ✅ Create order (api baseURL already /api)
      const res = await api.post("/payments/create-order", {
        amount,
        jobId: job._id,
      });

      // ✅ Response validate
      if (!res.data?.success || !res.data?.order?.id || !res.data?.key) {
        console.log("create-order bad response:", res.data);
        setMsg("❌ Order create failed (invalid response)");
        setSnack({ open: true, msg: "Order create failed ❌", type: "error" });
        return;
      }

      const { key, order } = res.data;

      const options = {
        key,
        amount: order.amount,
        currency: order.currency,
        name: "Job Web Subscription",
        description: `Subscribe for: ${job.title || "Job"}`,
        order_id: order.id,

        handler: async (response) => {
          try {
            const verifyRes = await api.post("/payments/verify", {
              jobId: job._id,
              amount,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.data?.success) {
              setMsg("✅ Payment success! Verified & saved in DB.");
              setSnack({ open: true, msg: "Payment Verified ✅", type: "success" });
            } else {
              console.log("verify bad response:", verifyRes.data);
              setMsg("❌ Payment not verified");
              setSnack({ open: true, msg: "Payment not verified ❌", type: "error" });
            }
          } catch (err) {
            console.error("verify error:", err);
            setMsg(err?.response?.data?.message || "❌ Verify API error");
            setSnack({ open: true, msg: "Verify API error ❌", type: "error" });
          }
        },

        modal: {
          ondismiss: () => {
            setMsg("⚠️ Payment popup closed");
            setSnack({ open: true, msg: "Payment popup closed ⚠️", type: "error" });
          },
        },

        prefill: {
          name: "Subhojit Santra",
          email: "s@gmail.com",
          contact: "6289619338",
        },

        theme: { color: "#111827" },
      };

      const rzp = new window.Razorpay(options);

      // ✅ Payment fail event
      rzp.on("payment.failed", function (resp) {
        console.error("payment failed:", resp?.error);
        setMsg(resp?.error?.description || "❌ Payment failed");
        setSnack({ open: true, msg: "Payment Failed ❌", type: "error" });
      });

      rzp.open();
    } catch (err) {
      console.error("subscribe error:", err);

      // ✅ Show proper message
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "❌ Subscribe error (check API baseURL / backend route)";

      setMsg(message);
      setSnack({ open: true, msg: "Subscribe error ❌", type: "error" });
    }
  };

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const { data } = await getJobs();
      setJobs(data?.jobs || []);
    } catch (e) {
      setSnack({ open: true, msg: "Failed to load jobs", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // ✅ Debug: check where API is pointing
    console.log("API BASE:", api.defaults.baseURL);
    fetchJobs();
  }, []);

  const filtered = useMemo(() => {
    const key = q.trim().toLowerCase();
    if (!key) return jobs;
    return jobs.filter((j) =>
      [j.title, j.company, j.location].some((x) =>
        (x || "").toLowerCase().includes(key)
      )
    );
  }, [jobs, q]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job?")) return;
    try {
      await deleteJobbyid(id);
      setSnack({ open: true, msg: "Job deleted", type: "success" });
      setJobs((prev) => prev.filter((j) => j._id !== id));
    } catch (e) {
      setSnack({ open: true, msg: "Delete failed", type: "error" });
    }
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
        All Jobs
      </Typography>

      {/* ✅ Payment message show */}
      {msg ? (
        <Alert sx={{ mb: 2 }} severity="info">
          {msg}
        </Alert>
      ) : null}

      <TextField
        fullWidth
        placeholder="Search by title / company / location..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        sx={{ mb: 3 }}
      />

      {loading ? (
        <Loader />
      ) : filtered.length === 0 ? (
        <Alert severity="info">No jobs found.</Alert>
      ) : (
        <Grid container spacing={2}>
          {filtered.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job._id}>
              <JobCard job={job} onDelete={handleDelete} onSubscribe={hsp} />
            </Grid>
          ))}
        </Grid>
      )}

      <Snackbar
        open={snack.open}
        autoHideDuration={2500}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
      >
        <Alert
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
          severity={snack.type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snack.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}