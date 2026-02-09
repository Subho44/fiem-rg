import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

//INSTANCE CREATE

const api = axios.create({
    baseURL:`${BASE_URL}/api`,
});

//jobs apis
export const getJobs = ()=>api.get("/jobs");
export const getJobbyid = (id)=>api.get(`/jobs/${id}`);
export const deleteJobbyid = (id)=>api.delete(`/jobs/${id}`);
export const createjob = (formdata) => api.post("/jobs",formdata,{
    headers:{"Content-Type":"multipart/form-data"},
});

export const getimageurl = (imgpath) => `${BASE_URL}${imgpath}`;

export default api;