import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Paper,
  Typography,
  Box,
  Chip,
  Stack,
  Button,
  Alert,
} from "@mui/material";
import Loader from "../components/Loader.jsx";
import { getJobbyid,getimageurl } from "../api/api.js";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const fetchJob = async () => {
    try {
      setLoading(true);
      const { data } = await getJobbyid(id);
      setJob(data);
    } catch (e) {
      setErr("Failed to load job details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  if (loading) return <Loader />;
  if (err) return <Alert severity="error">{err}</Alert>;
  if (!job) return <Alert severity="info">Job not found.</Alert>;

  const img = job?.jobimage ? getimageurl(job.jobimage) : "";

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" sx={{ fontWeight: 900 }}>
          {job.title}
        </Typography>

        <Button component={Link} to="/" variant="outlined">
          Back
        </Button>
      </Stack>

      <Typography color="text.secondary" sx={{ mt: 0.5 }}>
        {job.company} • {job.location}
      </Typography>

      <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: "wrap" }}>
        <Chip label={`Salary: ₹ ${job.salary || 0}`} />
        <Chip label={`Created: ${new Date(job.createdAt).toLocaleString()}`} />
      </Stack>

      {img ? (
        <Box
          component="img"
          src={img}
          alt={job.title}
          sx={{
            mt: 3,
            width: "100%",
            maxHeight: 380,
            objectFit: "cover",
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
          }}
        />
      ) : null}

      <Typography variant="h6" sx={{ mt: 3, fontWeight: 800 }}>
        Description
      </Typography>
      <Typography sx={{ mt: 1, whiteSpace: "pre-wrap" }}>
        {job.description}
      </Typography>
    </Paper>
  );
}