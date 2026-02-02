const Job = require('../models/Job');
const fs = require('fs');
const path = require('path');


//delete old image

function df(x) {
    try{
        if(!x) return ;
        const fullpath = path.join(__dirname,'..',x);
        if(fs.existsSync(fullpath)) fs.unlinkSync(fullpath);
    } catch(e) {
        console.error(e);
    }
}

//job add
exports.createjob = async(req,res) => {
    const {title,company,location,salary,description} = req.body;
    const jobimage = req.file ? `/uploads/jobs/${req.file.filename}` : '';
    const job = await Job.create({
        title,
        company,
        location,
        salary,
        description,
        jobimage
    });
    res.status(201).json({message:'job created',job});
};
//get all jobs
exports.viewjobs = async(req,res) => {
    const jobs = await Job.find();
    res.status(201).json({total:jobs.length,jobs});
};
//get single job
exports.viewsingeljob = async(req,res) => {
    const job = await Job.findById(req.params.id);
    res.status(201).json(job);
};
//delete job
exports.deletejob = async(req,res) => {
    const job = await Job.findById(req.params.id);
    df(job.jobimage);
    await Job.findByIdAndDelete(req.params.id);
    res.status(201).json({message:'job deletedz'});
};