import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createjob } from "../api/api";

export default function AddJob() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  });

  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });

    if (!form.title || !form.company || !form.location || !form.description) {
      setMsg({ type: "error", text: "Please fill required fields." });
      return;
    }

    try {
      setLoading(true);

      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("company", form.company);
      fd.append("location", form.location);
      fd.append("salary", form.salary || 0);
      fd.append("description", form.description);
      if (file) fd.append("jobimage", file); // must match backend: upload.single('jobimage')

      await createjob(fd);

      setMsg({ type: "success", text: "Job created successfully!" });

      setTimeout(() => nav("/"), 800);
    } catch (e) {
      setMsg({ type: "error", text: "Create failed (check server / CORS / API)" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
        Add New Job
      </Typography>

      {msg.text && (
        <Alert severity={msg.type} sx={{ mb: 2 }}>
          {msg.text}
        </Alert>
      )}

      <Box component="form" onSubmit={onSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Job Title *"
            name="title"
            value={form.title}
            onChange={onChange}
            fullWidth
          />
          <TextField
            label="Company *"
            name="company"
            value={form.company}
            onChange={onChange}
            fullWidth
          />
          <TextField
            label="Location *"
            name="location"
            value={form.location}
            onChange={onChange}
            fullWidth
          />
          <TextField
            label="Salary"
            name="salary"
            type="number"
            value={form.salary}
            onChange={onChange}
            fullWidth
          />
          <TextField
            label="Description *"
            name="description"
            value={form.description}
            onChange={onChange}
            fullWidth
            multiline
            minRows={4}
          />

          <Button variant="outlined" component="label">
            Upload Image (optional)
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </Button>

          {file && (
            <Typography variant="body2" color="text.secondary">
              Selected: {file.name}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            size="large"
          >
            {loading ? "Creating..." : "Create Job"}
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}