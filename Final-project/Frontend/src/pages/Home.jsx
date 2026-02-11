import React, { useEffect, useMemo, useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Alert,
  Snackbar,
  Box,
} from "@mui/material";
import Loader from "../components/Loader.jsx";
import JobCard from "../components/Jobcard.jsx";
import { deleteJobbyid,getJobs} from "../api/api.js";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [snack, setSnack] = useState({ open: false, msg: "", type: "success" });

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
              <JobCard job={job} onDelete={handleDelete} />
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